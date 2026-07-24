// Фото спикеров: «Фото спикеров/*» → public/speakers/*.webp 800x1000 (4:5).
// Кадры РУЧНЫЕ (extract в пикселях исходника): уровень глаз ~28-36% высоты
// кадра у всех — лица «на одной линии» в сетке карточек. Копия в public-regru.
import sharp from 'sharp'
import { mkdirSync, copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = 'C:/Users/vlad/Documents/nashedelo23'
const src = resolve(root, 'Фото спикеров')

/* file → [slug, {left, top, width, height}] — кадр в координатах исходника */
const MAP = {
  'Нагорная.jpg': ['nagornaya', { left: 0, top: 90, width: 1280, height: 1600 }],
  'Шаповалова Л.В..jpg': ['shapovalova', { left: 0, top: 0, width: 640, height: 800 }],
  'Жабин В.В..jpg': ['zhabin', { left: 124, top: 0, width: 1033, height: 1292 }],
  'Гаврилов.jpg': ['gavrilov', { left: 0, top: 103, width: 1280, height: 1600 }],
  'Гертель.jpg': ['gertel', { left: 205, top: 0, width: 680, height: 851 }],
  'Папета.jpg': ['papeta', { left: 0, top: 14, width: 602, height: 752 }],
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
