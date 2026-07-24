// Фото спикеров: «Фото спикеров/*» → public/speakers/*.webp 800x1000 (4:5).
// Кадры РУЧНЫЕ (extract в пикселях исходника): уровень глаз ~28-36% высоты
// кадра у всех — лица «на одной линии» в сетке карточек. Копия в public-regru.
import sharp from 'sharp'
import { mkdirSync, copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = 'C:/Users/vlad/Documents/nashedelo23'
const src = resolve(root, 'Фото спикеров')

/* file → [slug, {left, top, width, height}] — кадр в координатах исходника.
   Ревизия 2 (24.07): карточки стали 4:5 и показывают снимок ЦЕЛИКОМ, поэтому
   планы выровнены по крупности — у всех поясной/погрудный, лицо ~25-35%
   высоты кадра (Гаврилов и Нагорная были в рост, Папета — слишком общо). */
const MAP = {
  'Нагорная.jpg': ['nagornaya', { left: 212, top: 109, width: 856, height: 1070 }],
  'Шаповалова Л.В..jpg': ['shapovalova', { left: 0, top: 0, width: 720, height: 900 }],
  'Жабин В.В..jpg': ['zhabin', { left: 124, top: 0, width: 1033, height: 1292 }],
  'Гаврилов.jpg': ['gavrilov', { left: 240, top: 230, width: 720, height: 900 }],
  'Гертель.jpg': ['gertel', { left: 197, top: 28, width: 560, height: 700 }],
  'Папета.jpg': ['papeta', { left: 154, top: 42, width: 448, height: 560 }],
  'Амельченко.jpg': ['amelchenko', { left: 74, top: 0, width: 512, height: 640 }],
  'Беляева.jpg': ['belyaeva', { left: 165, top: 0, width: 800, height: 1000 }],
}

for (const dir of ['public/speakers', 'public-regru/speakers']) mkdirSync(resolve(root, dir), { recursive: true })

for (const [file, [slug, box]] of Object.entries(MAP)) {
  const out = resolve(root, 'public/speakers', slug + '.webp')
  await sharp(resolve(src, file))
    .rotate()
    .extract(box)
    .resize(800, 1000)
    .webp({ quality: 82 })
    .toFile(out)
  copyFileSync(out, resolve(root, 'public-regru/speakers', slug + '.webp'))
  const size = (await sharp(out).toBuffer()).length
  console.log(`${slug}.webp ${(size / 1024).toFixed(0)}KB`)
}
console.log('OK')
