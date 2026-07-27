// Фото спикеров: «Фото спикеров/*» → public/speakers/*.webp (+ копия в public-regru).
//   slug.webp    800x1000 — карточка в блоке «Спикеры»
//   slug-p.webp  480x600  — портрет в попапе программы (план крупнее)
//
// Кадры НЕ мерим на глаз: они считаются от рамки лица, найденной детектором
// (scripts/face-boxes.py, Haar OpenCV). Раньше кадры были ручными — лица
// уезжали влево-вправо и крупность гуляла от спикера к спикеру.
import sharp from 'sharp'
import { mkdirSync, copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = 'C:/Users/vlad/Documents/nashedelo23'
const src = resolve(root, 'Фото спикеров')

/* file → [slug, {x, y, size}] — рамка лица в координатах исходника
   (лоб→подбородок, без волос), size = её сторона. */
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

/* Оба кадра 4:5 (пропорция и карточки, и окна попапа):
     frameH — высота кадра в размерах рамки лица (меньше = крупнее план),
     above  — сколько оставить над рамкой лица (причёска + воздух),
     maxPad — сколько края разрешено подложить (доля стороны кадра).
   Лицо всегда по центру кадра по горизонтали. Уровень глаз ≈ (above+0.4)/frameH.
   Карточка — план шире (поясной), попап — крупнее (погрудный). */
const CARD = { frameH: 3.6, above: 0.85, maxPad: 0.12, w: 800, h: 1000, suffix: '', q: 82 }
const POPUP = { frameH: 3.3, above: 0.95, maxPad: 0.15, w: 480, h: 600, suffix: '-p', q: 84 }

for (const dir of ['public/speakers', 'public-regru/speakers']) mkdirSync(resolve(root, dir), { recursive: true })

async function crop(file, slug, face, cfg) {
  const out = resolve(root, 'public/speakers', slug + cfg.suffix + '.webp')
  const meta = await sharp(resolve(src, file)).rotate().metadata()
  const cx = face.x + face.size / 2

  /* Верх кадра задан рамкой лица и above — двигать его нельзя, иначе поедет
     уровень глаз. Поэтому подгоняем ВЫСОТУ: у тесных исходников (Жабин —
     почти «паспортный» квадрат) кадр урезается, чтобы снизу не размазывало
     подложенным краем больше maxPad. */
  const top = Math.round(face.y - cfg.above * face.size)
  let h = Math.min(cfg.frameH * face.size, (meta.height - top) / (1 - cfg.maxPad))
  let w = h * 0.8
  const padH = () => Math.max(0, w / 2 - cx) + Math.max(0, cx + w / 2 - meta.width)
  while (padH() > cfg.maxPad * w && h > 1) { h -= 2; w = h * 0.8 }  // то же по ширине
  h = Math.round(h)
  w = Math.round(h * 0.8)
  const left = Math.round(cx - w / 2)

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
    .resize(cfg.w, cfg.h)
    .webp({ quality: cfg.q })
    .toFile(out)

  copyFileSync(out, resolve(root, 'public-regru/speakers', slug + cfg.suffix + '.webp'))
  const size = (await sharp(out).toBuffer()).length
  const padded = Object.entries(pad).filter(([, v]) => v > 0).map(([k, v]) => `${k}+${v}`).join(' ')
  console.log(
    `${(slug + cfg.suffix).padEnd(14)} ${w}x${h}  план ${(h / face.size).toFixed(2)}  ` +
    `глаза ${(((cfg.above + 0.4) * face.size) / h * 100).toFixed(0)}%  ` +
    `${(size / 1024).toFixed(0)}KB${padded ? '  (подложено: ' + padded + ')' : ''}`,
  )
}

for (const [file, [slug, face]] of Object.entries(FACES)) {
  await crop(file, slug, face, CARD)
  await crop(file, slug, face, POPUP)
}
console.log('OK')
