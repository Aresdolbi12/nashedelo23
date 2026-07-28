// Проверка, что CSP не ломает страницу: ловим нарушения политики, ошибки
// консоли и упавшие запросы. Запуск: node scripts/csp-check.mjs [url]
import { webkit } from 'playwright'
const url = process.argv[2] || 'http://localhost:4180/'
for (const [name, engine] of [['webkit', webkit]]) {
  const b = await engine.launch()
  const p = await b.newPage()
  const bad = []
  p.on('console', (m) => { if (m.type() === 'error') bad.push('console: ' + m.text()) })
  p.on('pageerror', (e) => bad.push('pageerror: ' + e.message))
  p.on('requestfailed', (r) => bad.push('failed: ' + r.url().slice(0, 90) + ' — ' + r.failure()?.errorText))
  await p.goto(url, { waitUntil: 'networkidle', timeout: 90000 })
  await p.waitForTimeout(4000)
  const info = await p.evaluate(() => ({
    speakers: document.querySelectorAll('#speakers img').length,
    h1: !!document.querySelector('h1'),
    boot: !!document.querySelector('#boot'),
    ym: typeof window.ym,
  }))
  console.log(`[${name}] спикеров: ${info.speakers}, h1: ${info.h1}, #boot убран: ${!info.boot}, ym: ${info.ym}`)
  console.log(bad.length ? bad.map((x) => '  ! ' + x).join('\n') : '  нарушений CSP и ошибок нет')
  await b.close()
}
