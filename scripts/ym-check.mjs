// Проверка прода: какие cookie ставит Метрика (не должно быть _ym_visorc)
import { webkit } from 'playwright'
const b = await webkit.launch()
const ctx = await b.newContext()
const p = await ctx.newPage()
const reqs = []
p.on('request', (r) => { if (r.url().includes('yandex')) reqs.push(r.url().split('?')[0]) })
await p.goto('https://xn--23-6kcqeb6blo9g.xn--p1ai/', { waitUntil: 'networkidle', timeout: 60000 })
await p.waitForTimeout(4000)
console.log('cookies:', (await ctx.cookies()).map((c) => c.name).join(', '))
console.log('ym-запросы:', [...new Set(reqs)].join('\n  '))
console.log('webvisor в html:', await p.evaluate(() => (document.documentElement.innerHTML.match(/webvisor[^,}]*/) || ['нет'])[0]))
await b.close()
