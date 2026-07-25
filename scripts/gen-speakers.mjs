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

/* Кадры для попапа лекции (2026-07-25). Сначала были квадратные, но в
   квадрате портреты сидят тесно — окно сделали вертикальным (4:5, как сами
   снимки), кадры пересчитаны свободнее: над макушкой ~11% высоты кадра
   воздуха, голова (макушка→подбородок) ~44% кадра, лицо по центру.
   Замеры — по контрольному листу с сеткой (см. историю в памяти проекта). */
const PORTRAIT = {
  /* Нагорной и Гертель кадр шире расчётного: пышная причёска выше «макушки» */
  'Нагорная.jpg': ['nagornaya', { left: 192, top: 228, width: 664, height: 830 }],
  'Шаповалова Л.В..jpg': ['shapovalova', { left: 64, top: 0, width: 606, height: 757 }],
  'Жабин В.В..jpg': ['zhabin', { left: 175, top: 0, width: 1034, height: 1292 }],
  'Гаврилов.jpg': ['gavrilov', { left: 476, top: 444, width: 262, height: 327 }],
  'Гертель.jpg': ['gertel', { left: 311, top: 67, width: 344, height: 430 }],
  'Папета.jpg': ['papeta', { left: 270, top: 178, width: 224, height: 280 }],
  'Амельченко.jpg': ['amelchenko', { left: 165, top: 16, width: 349, height: 436 }],
  'Беляева.jpg': ['belyaeva', { left: 287, top: 12, width: 636, height: 795 }],
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

for (const [file, [slug, box]] of Object.entries(PORTRAIT)) {
  const out = resolve(root, 'public/speakers', slug + '-p.webp')
  await sharp(resolve(src, file))
    .rotate()
    .extract(box)
    .resize(400, 500)
    .webp({ quality: 84 })
    .toFile(out)
  copyFileSync(out, resolve(root, 'public-regru/speakers', slug + '-p.webp'))
  const size = (await sharp(out).toBuffer()).length
  console.log(`${slug}-p.webp ${(size / 1024).toFixed(0)}KB`)
}
console.log('OK')
