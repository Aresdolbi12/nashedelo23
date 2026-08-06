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
   (лоб→подбородок, без волос), size = её сторона.
   27.07: заказчик перевыпустил 4 снимка с единым серым фоном (файлы с полным
   ФИО в имени) и добавил Пистунову — рамки пересняты детектором заново.
   30.07: новые снимки Жабина и Гертель (старые — в «Фото спикеров/старые»).
   У Жабина исходник наконец широкий, план встал вровень с остальными. */
const FACES = {
  'Елена Алексеевна Пистунова.png': ['pistunova', { x: 372, y: 189, size: 284 }],
  'Инна Леонидовна Беляева.png': ['belyaeva', { x: 283, y: 189, size: 242 }],
  'Нагорная.jpg': ['nagornaya', { x: 395, y: 503, size: 324 }],
  'Шаповалова Л.В..jpg': ['shapovalova', { x: 282, y: 202, size: 324 }],
  'Жабин.jpeg': ['zhabin', { x: 773, y: 467, size: 636 }],
  'Гаврилов.jpg': ['gavrilov', { x: 461, y: 506, size: 215 }],
  'Татьяна Николаевна Папета.png': ['papeta', { x: 250, y: 193, size: 218 }],
  // детектор дал 1390 — на распущенных волосах рамка раздувается; ужата по
  // межзрачковому расстоянию (506 px, как у остальных ≈0.42 стороны рамки)
  'Гертель Е.А..jpg': ['gertel', { x: 949, y: 481, size: 1200 }],
  'Амельченко.jpg': ['amelchenko', { x: 225, y: 87, size: 197 }],
}

/* Оба кадра 4:5 (пропорция и карточки, и окна попапа):
     frameH — высота кадра в размерах рамки лица (меньше = крупнее план),
     above  — сколько оставить над рамкой лица (причёска + воздух),
     maxPad — сколько края разрешено подложить (доля стороны кадра).
   Лицо всегда по центру кадра по горизонтали. Уровень глаз ≈ (above+0.4)/frameH.
   Карточка — план шире (поясной), попап — крупнее (погрудный). */
const CARD = { frameH: 3.6, above: 0.85, maxTop: 0.18, w: 800, h: 1000, suffix: '', q: 82 }
const POPUP = { frameH: 3.3, above: 0.95, maxTop: 0.18, w: 480, h: 600, suffix: '-p', q: 84 }

for (const dir of ['public/speakers', 'public-regru/speakers']) mkdirSync(resolve(root, dir), { recursive: true })

async function crop(file, slug, face, cfg) {
  const out = resolve(root, 'public/speakers', slug + cfg.suffix + '.webp')
  const meta = await sharp(resolve(src, file)).rotate().metadata()
  const cx = face.x + face.size / 2

  /* СНИЗУ И ПО БОКАМ КРАЙ НЕ ПОДКЛАДЫВАЕМ (правка 27.07): там одежда и руки,
     копия крайнего пикселя даёт «растяжку» — заказчик поймал её у Жабина и
     Пистуновой. Кадр обязан помещаться в исходник, поэтому при нехватке места
     режем ВЫСОТУ (у Жабина исходник почти «паспортный» квадрат — план выходит
     крупнее прочих, это честнее размазанного низа).
     Сверху подложить можно: там ровный фон, шва не видно. */
  let top = Math.round(face.y - cfg.above * face.size)
  // слишком много подложки сверху — опускаем кадр (лицо чуть ниже в кадре)
  const maxTop = Math.round(cfg.maxTop * cfg.frameH * face.size)
  if (-top > maxTop) top = -maxTop
  /* По ширине кадр тоже обязан поместиться. Раньше требовалось, чтобы лицо
     стояло РОВНО по центру (кадр ≤ 2·min(cx, W−cx)) — у Гертель лицо смещено
     влево, и это правило срезало высоту до плана 2.79 против 3.6 у соседей.
     Теперь допускаем смещение лица от центра кадра до OFF: на глаз незаметно,
     зато крупность не гуляет от карточки к карточке. */
  const OFF = 0.07
  const hSide = Math.min(meta.width, Math.min(cx, meta.width - cx) / (0.5 - OFF)) / 0.8
  const h = Math.round(Math.min(cfg.frameH * face.size, meta.height - top, hSide))
  const w = Math.round(h * 0.8)
  const left = Math.max(0, Math.min(Math.round(cx - w / 2), meta.width - w))

  const pad = { top: Math.max(0, -top), left: 0, bottom: 0, right: 0 }
  let img = sharp(resolve(src, file)).rotate()
  if (pad.top) img = sharp(await img.extend({ ...pad, extendWith: 'copy' }).toBuffer())
  await img
    .extract({ left, top: top + pad.top, width: w, height: h })
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
