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

/* Кадры для попапа лекции (2026-07-26, ревизия 3). Раньше мерил на глаз —
   лица уезжали влево-вправо и крупность гуляла. Теперь кадр СЧИТАЕТСЯ от
   рамки лица, найденной детектором (scripts/face-boxes.py, Haar OpenCV):
     [x, y, size] рамки — лоб→подбородок, size = её сторона.
   Кадр 4:5: высота = FRAME_H × size, лицо по центру по горизонтали,
   над рамкой лица = ABOVE × size (причёска + воздух).
   Если кадр вылезает за край — подкладываем края (extendWith: copy), иначе
   пришлось бы жать кадр и ломать единую крупность. */
const FACES = {
  'Нагорная.jpg': ['nagornaya', { x: 395, y: 503, size: 324 }],
  'Шаповалова Л.В..jpg': ['shapovalova', { x: 282, y: 202, size: 324 }],
  'Жабин В.В..jpg': ['zhabin', { x: 308, y: 463, size: 555 }],
  'Гаврилов.jpg': ['gavrilov', { x: 461, y: 506, size: 215 }],
  /* у Гертель детектор крупнее всего оценил микрофон с рукой — рамка её
     настоящего лица выбрана вручную из списка кандидатов (проверено глазами) */
  'Гертель.jpg': ['gertel', { x: 434, y: 117, size: 193 }],
  'Папета.jpg': ['papeta', { x: 319, y: 177, size: 133 }],
  'Амельченко.jpg': ['amelchenko', { x: 225, y: 87, size: 197 }],
  'Беляева.jpg': ['belyaeva', { x: 432, y: 156, size: 287 }],
}
const FRAME_H = 3.3   // высота кадра в размерах рамки лица
const ABOVE = 0.95    // сколько оставить над рамкой лица (причёска + воздух)
const MAX_PAD = 0.15  // максимум подложенного края (доля от стороны кадра)

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

for (const [file, [slug, face]] of Object.entries(FACES)) {
  const out = resolve(root, 'public/speakers', slug + '-p.webp')
  const meta = await sharp(resolve(src, file)).rotate().metadata()

  /* Кадр урезаем, если под него пришлось бы подкладывать больше MAX_PAD:
     у Жабина исходник — тесный «паспортный» квадрат, и без этого снизу
     размазывало бы четверть кадра. */
  const fit = (meta.height - face.y + ABOVE * face.size) / (1 - MAX_PAD)
  const h = Math.round(Math.min(FRAME_H * face.size, fit))
  const w = Math.round(h * 0.8)
  const top = Math.round(face.y - ABOVE * face.size)
  const left = Math.round(face.x + face.size / 2 - w / 2)

  const pad = {
    top: Math.max(0, -top),
    left: Math.max(0, -left),
    bottom: Math.max(0, top + h - meta.height),
    right: Math.max(0, left + w - meta.width),
  }
  let img = sharp(resolve(src, file)).rotate()
  if (pad.top || pad.left || pad.bottom || pad.right) {
    img = sharp(await img.extend({ ...pad, extendWith: 'copy' }).toBuffer())
  }
  await img
    .extract({ left: left + pad.left, top: top + pad.top, width: w, height: h })
    .resize(480, 600)
    .webp({ quality: 84 })
    .toFile(out)

  copyFileSync(out, resolve(root, 'public-regru/speakers', slug + '-p.webp'))
  const size = (await sharp(out).toBuffer()).length
  const padded = Object.entries(pad).filter(([, v]) => v > 0).map(([k, v]) => `${k}+${v}`).join(' ')
  console.log(`${slug}-p.webp ${w}x${h} ${(size / 1024).toFixed(0)}KB${padded ? '  (подложено: ' + padded + ')' : ''}`)
}
console.log('OK')
