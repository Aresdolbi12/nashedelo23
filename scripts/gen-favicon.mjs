// Favicon «Наше дело»: серебряная звезда (металл логотипа) на тёмно-зелёной
// плитке бренда. SVG + PNG 32/180 в public/ (gh-pages) и public-regru/ (прод).
import { resolve } from 'node:path'
import { writeFileSync, copyFileSync } from 'node:fs'
import sharp from 'sharp'

const root = 'C:/Users/vlad/Documents/nashedelo23'

// Пятиконечная звезда: центр (32, 34.5), R=24 — крупная, читаемая в 16px
const cx = 32, cy = 34.5, R = 24, r = R * 0.382
const pts = []
for (let i = 0; i < 10; i++) {
  const a = -Math.PI / 2 + (i * Math.PI) / 5
  const rad = i % 2 === 0 ? R : r
  pts.push(`${(cx + rad * Math.cos(a)).toFixed(2)},${(cy + rad * Math.sin(a)).toFixed(2)}`)
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="m" x1="0" y1="0" x2="0.9" y2="1">
      <stop offset="0" stop-color="#eef1f4"/>
      <stop offset="0.55" stop-color="#aeb9c4"/>
      <stop offset="1" stop-color="#77828f"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="13" fill="#0d2f22"/>
  <polygon points="${pts.join(' ')}" fill="url(#m)"/>
</svg>
`

for (const dir of ['public', 'public-regru']) {
  writeFileSync(resolve(root, dir, 'favicon.svg'), svg)
}
const buf = Buffer.from(svg)
await sharp(buf, { density: 300 }).resize(32, 32).png().toFile(resolve(root, 'public/favicon.png'))
await sharp(buf, { density: 300 }).resize(180, 180).png().toFile(resolve(root, 'public/apple-touch-icon.png'))
copyFileSync(resolve(root, 'public/favicon.png'), resolve(root, 'public-regru/favicon.png'))
copyFileSync(resolve(root, 'public/apple-touch-icon.png'), resolve(root, 'public-regru/apple-touch-icon.png'))
console.log('OK: favicon.svg + favicon.png(32) + apple-touch-icon.png(180) в public/ и public-regru/')
