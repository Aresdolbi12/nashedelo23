// Проверка сайта «глазами iPhone»: НАСТОЯЩИЙ движок WebKit (Playwright) +
// профиль iPhone 13 (390x844, DPR 3, touch, iOS UA). Десктопный Chrome
// WebKit-баги не ловит — карта уже дважды «терялась» только на реальном айфоне.
//
// Использование:
//   node scripts/mobile-check.mjs                 → прод нашедело23.рф
//   node scripts/mobile-check.mjs http://localhost:5173/nashedelo23/33/index.html
//
// Что делает: открывает страницу, скроллит к карте, ждёт анимации, снимает
// скриншоты (shots-mobile/), и ГЛАВНОЕ — считает пиксели по цветам:
// красный маршрут, бежевая граница, точки городов. Вердикт печатается в конце
// и код выхода 1, если карта «пустая».

import { webkit, devices } from 'playwright'
import { mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, 'shots-mobile')
mkdirSync(outDir, { recursive: true })

const url = process.argv[2] || 'https://xn--23-6kcqeb6blo9g.xn--p1ai/'
console.log(`WebKit(iPhone 13) → ${url}`)

const browser = await webkit.launch()
const ctx = await browser.newContext({ ...devices['iPhone 13'] })
const page = await ctx.newPage()
const errors = []
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message))
page.on('console', (m) => m.type() === 'error' && errors.push('console: ' + m.text()))

await page.goto(url, { waitUntil: 'load', timeout: 60000 })
await page.waitForTimeout(2500)
await page.screenshot({ path: resolve(outDir, 'hero.png') })

// горизонтальное «гуляние»
const hscroll = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)

// к карте, дождаться анимаций
await page.locator('#schedule').scrollIntoViewIfNeeded()
await page.waitForTimeout(3500)
const mapEl = page.locator('#schedule svg')
const mapShot = await mapEl.screenshot({ path: resolve(outDir, 'map.png') })

// подсчёт пикселей карты по цветам
const { data, info } = await sharp(mapShot).raw().toBuffer({ resolveWithObject: true })
let red = 0
let beige = 0
let dot = 0
for (let i = 0; i < data.length; i += info.channels) {
  const r = data[i], g = data[i + 1], b = data[i + 2]
  if (r > 170 && g < 120 && b < 110) red++ // маршрут #e04e39
  else if (r > 185 && r < 245 && g > 160 && g < 220 && b > 130 && b < 195 && r > g && g > b) beige++ // граница/штрихи
  else if (r > 228 && g > 218 && b > 200) dot++ // точки городов #f2e9de
}

// спикеры и футер — просто скриншоты для глаз
await page.locator('#speakers').scrollIntoViewIfNeeded()
await page.waitForTimeout(1800)
await page.locator('#speakers').screenshot({ path: resolve(outDir, 'speakers.png') })
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await page.waitForTimeout(1500)
await page.screenshot({ path: resolve(outDir, 'footer.png') })

await browser.close()

const px = info.width * info.height
const verdict = {
  hscroll,
  map: { red, beige, cityDots: dot, size: `${info.width}x${info.height}` },
  redOk: red > px * 0.0005,
  /* граница тонкая и полупрозрачная — на эталонном скриншоте ~1000px чистого бежа */
  beigeOk: beige > 400,
  dotsOk: dot > 50,
  errors,
}
console.log(JSON.stringify(verdict, null, 1))
const ok = verdict.redOk && verdict.beigeOk && verdict.dotsOk && hscroll <= 0 && errors.length === 0
console.log(ok ? 'OK: карта видна на WebKit/iPhone, скролла вбок нет' : 'FAIL: смотри shots-mobile/*.png')
process.exit(ok ? 0 : 1)
