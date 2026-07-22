// Глубокая охота на баги: WebKit (движок iPhone) в двух профилях —
// iPhone 13 и десктоп 1280/1920 — с ИНТЕРАКТИВОМ: меню, модалка лекции,
// FAQ-аккордеон, sticky-крестик, якоря. Плюс структурные проверки.
import { webkit, devices } from 'playwright'
import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const root = 'C:/Users/vlad/Documents/nashedelo23'
const outDir = resolve(root, 'shots-mobile')
mkdirSync(outDir, { recursive: true })
const url = process.argv[2] || 'https://xn--23-6kcqeb6blo9g.xn--p1ai/'

const issues = []
const note = (profile, what) => issues.push(`[${profile}] ${what}`)

async function sweep(profile, ctxOpts, browser) {
  const ctx = await browser.newContext(ctxOpts)
  const page = await ctx.newPage()
  page.on('pageerror', (e) => note(profile, 'pageerror: ' + e.message))
  page.on('console', (m) => m.type() === 'error' && note(profile, 'console: ' + m.text()))
  page.on('requestfailed', (r) => {
    if (!/mc\.yandex/.test(r.url())) note(profile, 'request failed: ' + r.url().slice(0, 90))
  })
  await page.goto(url, { waitUntil: 'load', timeout: 60000 })
  await page.waitForTimeout(2600)

  // 1. Горизонтальное переполнение
  const hscroll = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  if (hscroll > 0) note(profile, `hscroll: +${hscroll}px`)

  // 2. Каунтдаун: дни до 16.09 совпадают с реальностью
  const cd = await page.evaluate(() => {
    const t = document.body.innerText.match(/(\d+)\s*\n?\s*дней/i)
    return t ? +t[1] : null
  })
  const realDays = Math.floor((new Date('2026-09-16T09:00:00+03:00') - Date.now()) / 86400000)
  if (cd == null) note(profile, 'каунтдаун не найден')
  else if (Math.abs(cd - realDays) > 1) note(profile, `каунтдаун врёт: ${cd} vs ${realDays}`)

  // 3. Внешние ссылки: target=_blank без noopener
  const badLinks = await page.evaluate(() =>
    [...document.querySelectorAll('a[target=_blank]')]
      .filter((a) => !/noopener/.test(a.rel))
      .map((a) => a.href.slice(0, 60)),
  )
  badLinks.forEach((l) => note(profile, 'target=_blank без noopener: ' + l))

  // 4. Битые внутренние якоря
  const badAnchors = await page.evaluate(() =>
    [...document.querySelectorAll('a[href^="#"]')]
      .map((a) => a.getAttribute('href'))
      .filter((h) => h.length > 1 && !document.querySelector(h))
      .filter((v, i, arr) => arr.indexOf(v) === i),
  )
  badAnchors.forEach((h) => note(profile, 'якорь в никуда: ' + h))

  // 5. Модалка лекции: открыть первую лекцию программы
  try {
    await page.locator('#program').scrollIntoViewIfNeeded()
    await page.waitForTimeout(900)
    await page.locator('#program h4 button').first().click({ timeout: 4000 })
    await page.waitForTimeout(700)
    const dialog = page.locator('[role=dialog]')
    if (!(await dialog.isVisible())) note(profile, 'модалка лекции не открылась')
    else {
      await page.screenshot({ path: resolve(outDir, `modal-${profile}.png`) })
      const mOver = await page.evaluate(() => {
        const d = document.querySelector('[role=dialog]')
        const r = d.getBoundingClientRect()
        return { clipped: r.right > window.innerWidth + 1 || r.left < -1, scrollable: d.scrollHeight > d.clientHeight + 4 }
      })
      if (mOver.clipped) note(profile, 'модалка обрезана по ширине')
      await page.locator('button[aria-label="Закрыть"]').click({ timeout: 3000 })
      await dialog.waitFor({ state: 'hidden', timeout: 3000 }).catch(() => note(profile, 'модалка не закрылась'))
    }
  } catch (e) {
    note(profile, 'модалка: ' + e.message.split('\n')[0])
  }

  // 6. FAQ-аккордеон
  try {
    await page.locator('#faq').scrollIntoViewIfNeeded()
    await page.waitForTimeout(700)
    const q = page.locator('#faq button[aria-expanded]').first()
    await q.click({ timeout: 3000 })
    await page.waitForTimeout(400)
    if ((await q.getAttribute('aria-expanded')) !== 'true') note(profile, 'FAQ не раскрывается')
    await q.click()
    await page.waitForTimeout(300)
    if ((await q.getAttribute('aria-expanded')) !== 'false') note(profile, 'FAQ не сворачивается')
  } catch (e) {
    note(profile, 'FAQ: ' + e.message.split('\n')[0])
  }

  // 7. Sticky CTA: появление и крестик
  try {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.5))
    await page.waitForTimeout(900)
    const close = page.locator('button[aria-label="Скрыть кнопку записи"]')
    if (!(await close.isVisible())) note(profile, 'sticky CTA не появилась')
    else {
      const box = await close.boundingBox()
      if (box.width < 43 || box.height < 43) note(profile, `тап-зона крестика ${Math.round(box.width)}px`)
      await close.click()
      await page.waitForTimeout(400)
      if (await close.isVisible().catch(() => false)) note(profile, 'крестик не скрывает sticky')
    }
  } catch (e) {
    note(profile, 'sticky: ' + e.message.split('\n')[0])
  }

  // 8. Мобильное меню (бургер)
  if (ctxOpts.isMobile) {
    try {
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.waitForTimeout(600)
      const burger = page.locator('button[aria-label="Открыть меню"]')
      await burger.click({ timeout: 3000 })
      await page.waitForTimeout(500)
      await page.screenshot({ path: resolve(outDir, `menu-${profile}.png`) })
      const menuLinks = await page.locator('a[href="#program"]:visible').count()
      if (!menuLinks) note(profile, 'меню открылось без ссылок')
      await page.locator('button[aria-label="Закрыть меню"]').click({ timeout: 3000 })
      await page.waitForTimeout(400)
    } catch (e) {
      note(profile, 'бургер-меню: ' + e.message.split('\n')[0])
    }
  }

  // 9. Полный прокрут до подвала + скрин
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(1200)
  await page.screenshot({ path: resolve(outDir, `bottom-${profile}.png`) })

  await ctx.close()
}

const browser = await webkit.launch()
await sweep('iphone', { ...devices['iPhone 13'] }, browser)
await sweep('desktop1280', { viewport: { width: 1280, height: 800 } }, browser)
await sweep('desktop1920', { viewport: { width: 1920, height: 1080 } }, browser)
await browser.close()

console.log(issues.length ? issues.join('\n') : 'CLEAN: багов не найдено во всех трёх профилях')
process.exit(0)
