// Генерация OG-превью (1200×630) для нашедело23.рф: фирменный зелёный фон,
// контур звезды как в hero, металлический логотип «НАШЕ ДЕЛО» и подпись.
// Запуск: node scripts/gen-og.mjs   → public-regru/og.jpg
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { mkdirSync } from 'node:fs'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const W = 1200
const H = 630

// Пятиконечная звезда контуром — тот же мотив, что на первом экране сайта
const star = (cx, cy, r) =>
  Array.from({ length: 5 }, (_, i) => {
    const a = (Math.PI / 180) * (-90 + i * 144)
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`
  }).join(' ')

const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1b5540"/>
      <stop offset="100%" stop-color="#0d2f22"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <polygon points="${star(600, 300, 340)}" fill="none" stroke="#ffffff" stroke-opacity="0.10" stroke-width="2"/>
  <text x="600" y="545" text-anchor="middle" font-family="Arial, sans-serif" font-size="30"
        font-weight="700" letter-spacing="4" fill="#e8ded0">ОБРАЗОВАТЕЛЬНАЯ БИЗНЕС-ПРОГРАММА</text>
  <text x="600" y="588" text-anchor="middle" font-family="Arial, sans-serif" font-size="23"
        fill="#e8ded0" fill-opacity="0.72">для ветеранов боевых действий, участников СВО и членов их семей</text>
</svg>`)

const LOGO_W = 560
const logo = await sharp(resolve(root, 'src33/assets/logo-nashe-delo.webp'))
  .resize({ width: LOGO_W, fit: 'inside' })
  .toBuffer()

mkdirSync(resolve(root, 'public-regru'), { recursive: true })
await sharp(bg)
  .composite([{ input: logo, left: Math.round((W - LOGO_W) / 2), top: 55 }])
  .jpeg({ quality: 88, chromaSubsampling: '4:4:4' })
  .toFile(resolve(root, 'public-regru/og.jpg'))

console.log('OK: public-regru/og.jpg')
