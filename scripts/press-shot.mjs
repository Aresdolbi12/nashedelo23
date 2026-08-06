// Снимок блока «О нас пишут» для проверки новой карточки.
import { webkit } from 'playwright'
const b = await webkit.launch()
const p = await b.newPage({ viewport: { width: 1280, height: 900 } })
await p.goto(process.argv[2] || 'http://localhost:4180/', { waitUntil: 'networkidle', timeout: 90000 })
await p.evaluate(() => document.querySelector('#press').scrollIntoView())
await p.waitForTimeout(2500)
await p.locator('#press').screenshot({ path: 'shots-mobile/press.jpg', type: 'jpeg', quality: 88 })
const rows = await p.$$eval('#press article', (a) => a.map((x) => x.innerText.split('\n').filter(Boolean)))
console.log(JSON.stringify(rows, null, 1))
await b.close()
