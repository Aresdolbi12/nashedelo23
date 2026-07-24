// Дамп содержимого Яндекс.Формы регистрации (SPA — нужен JS)
import { webkit } from 'playwright'
const browser = await webkit.launch()
const page = await (await browser.newContext()).newPage()
await page.goto('https://forms.yandex.ru/cloud/6a61b7061f1eb54dccc0d09e', { waitUntil: 'load', timeout: 60000 })
await page.waitForTimeout(5000)
const text = await page.evaluate(() => document.body.innerText)
const links = await page.evaluate(() => [...document.querySelectorAll('a')].map((a) => a.textContent.trim() + ' -> ' + a.href))
const fields = await page.evaluate(() =>
  [...document.querySelectorAll('input, textarea, select')].map((i) => ({
    type: i.type || i.tagName,
    required: i.required || i.getAttribute('aria-required'),
    label: (i.closest('[class*=question]')?.querySelector('label,legend,[class*=label]')?.textContent || '').trim().slice(0, 120),
  })),
)
console.log('=== TEXT ===\n' + text.slice(0, 4000))
console.log('=== LINKS ===\n' + links.join('\n'))
console.log('=== FIELDS ===\n' + JSON.stringify(fields, null, 1).slice(0, 3000))
await browser.close()
