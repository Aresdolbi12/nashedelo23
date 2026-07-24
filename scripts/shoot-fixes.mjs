// Скриншоты трёх правок 24.07: спикеры 4:5, баннер с ракетой, отсутствие
// линий-разделителей между секциями. WebKit (движок iPhone) + десктоп.
import { webkit, devices } from 'playwright'
import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const outDir = resolve('C:/Users/vlad/Documents/nashedelo23', 'shots-mobile')
mkdirSync(outDir, { recursive: true })
const url = process.argv[2] || 'http://localhost:5313/33/'

const browser = await webkit.launch()

async function shoot(profile, ctxOpts) {
  const ctx = await browser.newContext(ctxOpts)
  const page = await ctx.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message))
  page.on('console', (m) => m.type() === 'error' && errors.push('console: ' + m.text()))
  await page.goto(url, { waitUntil: 'load', timeout: 60000 })
  await page.waitForTimeout(2500)

  for (const [id, name] of [['speakers', 'spk'], ['svo-support', 'svo']]) {
    await page.locator('#' + id).scrollIntoViewIfNeeded()
    await page.waitForTimeout(1300)
    await page.locator('#' + id).screenshot({ path: resolve(outDir, `fix-${name}-${profile}.png`) })
  }

  // Разделители: не осталось ли border-top у секций
  const borders = await page.evaluate(() =>
    [...document.querySelectorAll('main > section')]
      .map((s) => getComputedStyle(s).borderTopWidth)
      .filter((w) => w !== '0px'),
  )
  // Фото: все 8 карточек с webp, натуральная пропорция
  const imgs = await page.evaluate(() =>
    [...document.querySelectorAll('#speakers img')].map((i) => ({
      ok: i.complete && i.naturalWidth > 0,
      nw: i.naturalWidth, nh: i.naturalHeight,
      dw: Math.round(i.getBoundingClientRect().width),
      dh: Math.round(i.getBoundingClientRect().height),
    })),
  )
  console.log(`[${profile}] borders=${JSON.stringify(borders)} imgs=${imgs.length} broken=${imgs.filter((i) => !i.ok).length} card=${imgs[0]?.dw}x${imgs[0]?.dh} photo=${imgs[0]?.nw}x${imgs[0]?.nh}${errors.length ? ' ERRORS: ' + errors.join('; ') : ''}`)
  await ctx.close()
}

await shoot('iphone', { ...devices['iPhone 13'] })
await shoot('desktop', { viewport: { width: 1440, height: 900 } })
await browser.close()
