// Скриншоты секции спикеров и баннера СВО: iPhone + десктоп (WebKit)
import { webkit, devices } from 'playwright'
import { resolve } from 'node:path'

const url = process.argv[2] || 'https://xn--23-6kcqeb6blo9g.xn--p1ai/'
const browser = await webkit.launch()

for (const [name, opts] of [
  ['iphone', { ...devices['iPhone 13'] }],
  ['desktop', { viewport: { width: 1280, height: 900 } }],
]) {
  const page = await (await browser.newContext(opts)).newPage()
  await page.goto(url, { waitUntil: 'load', timeout: 60000 })
  await page.waitForTimeout(2000)
  await page.locator('#speakers').scrollIntoViewIfNeeded()
  await page.waitForTimeout(1800)
  await page.locator('#speakers').screenshot({ path: resolve('shots-mobile', `spk-${name}.png`) })
  await page.locator('#svo-support').scrollIntoViewIfNeeded()
  await page.waitForTimeout(1300)
  await page.locator('#svo-support').screenshot({ path: resolve('shots-mobile', `svo-${name}.png`) })
}
await browser.close()
console.log('OK')
