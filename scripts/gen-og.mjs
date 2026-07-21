// Генерация OG-превью (1200×630) для нашедело23.рф.
//
// Картинка — реальный первый экран сайта, снятый headless-хромом с уже
// собранного dist-regru/index.html (логотип рисуется в HTML/CSS, поэтому
// рисовать превью отдельно из старого webp нельзя — разъедется с сайтом).
//
// Порядок: npm run build:regru → npm run og
// Результат: public-regru/og.jpg (его подхватит следующий build:regru)

import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const W = 1200
const H = 630

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].find(existsSync)
if (!CHROME) throw new Error('Не найден Chrome/Edge для рендера OG-картинки')

const built = resolve(root, 'dist-regru/index.html')
if (!existsSync(built)) throw new Error('Сначала собери сайт: npm run build:regru')

// Копия сборки без плавающих элементов: навигация, липкая CTA и интро-вуаль
// в карточке превью только мешают.
const shot = resolve(root, 'dist-regru/_og.html')
const png = resolve(root, 'dist-regru/_og.png')
// Блоки hero проявляются анимацией с задержкой 1.0–1.3 с, а виртуальное время
// headless-хрома до них не доходит (rAF под ним почти не двигается) — поэтому
// элементы, которые framer оставил на inline opacity: 0, открываем сами.
const hide = `<style>
  nav, [class*="z-[100]"], .fixed.bottom-4, #boot { display: none !important; }
  section#top { padding-top: 2.5rem !important; }
  section#top [style*="opacity: 0"] { opacity: 1 !important; transform: none !important; }
  /* таймер обратного отсчёта в карточке не нужен — он устаревает и режется краем */
  section#top [class*="gap-2.5"] { display: none !important; }
</style>`
writeFileSync(shot, readFileSync(built, 'utf8').replace('</head>', `${hide}</head>`))

execFileSync(CHROME, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  `--window-size=${W},${H}`,
  '--force-device-scale-factor=2', // снимаем в 2× и ужимаем — текст резче
  // компоненты уважают prefers-reduced-motion, поэтому в этом режиме
  // анимация входа сразу в финальном состоянии — не поймаем середину
  '--force-prefers-reduced-motion',
  '--virtual-time-budget=20000', // дождаться шрифтов Google
  `--screenshot=${png}`,
  `file:///${shot.replace(/\\/g, '/')}`,
], { stdio: 'ignore' })

mkdirSync(resolve(root, 'public-regru'), { recursive: true })
await sharp(png)
  .resize(W, H, { fit: 'cover' })
  .jpeg({ quality: 88, chromaSubsampling: '4:4:4' })
  .toFile(resolve(root, 'public-regru/og.jpg'))

rmSync(shot, { force: true })
rmSync(png, { force: true })
console.log('OK: public-regru/og.jpg')
