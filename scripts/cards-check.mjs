// Контрольный лист карточек спикеров: 8 готовых кадров в сетке, поверх —
// ось центра (лицо должно стоять на ней) и линия глаз 35%. Так проверяется
// результат gen-speakers.mjs. Запуск из корня: node scripts/cards-check.mjs
import { webkit } from 'playwright'
import { writeFileSync } from 'node:fs'

const slugs = ['pistunova', 'belyaeva', 'nagornaya', 'shapovalova', 'zhabin', 'gavrilov', 'papeta', 'gertel', 'amelchenko']
const cells = slugs.map((s) => `
  <div><div class="c">
    <img src="../public/speakers/${s}.webp">
    <div class="v"></div><div class="h" style="top:35%"></div>
  </div><span>${s}</span></div>`).join('')

const html = `<!doctype html><meta charset=utf-8><style>
 body{margin:0;background:#0d2f22;font:11px system-ui;display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:14px}
 .c{position:relative}
 .c img{display:block;width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:10px}
 .v{position:absolute;left:50%;top:0;bottom:0;width:1px;background:rgba(0,255,255,.8)}
 .h{position:absolute;left:0;right:0;height:1px;background:rgba(255,60,60,.8)}
 span{color:#d9bfa8;display:block;text-align:center;padding-top:4px}
</style>${cells}`

writeFileSync('shots-mobile/cards-check.html', html)   // shots-mobile/ в .gitignore
const b = await webkit.launch()
const p = await b.newPage({ viewport: { width: 1400, height: 900 } })
await p.goto('file:///C:/Users/vlad/Documents/nashedelo23/shots-mobile/cards-check.html')
await p.waitForTimeout(800)
await p.screenshot({ path: 'shots-mobile/cards-check.jpg', fullPage: true, type: 'jpeg', quality: 88 })
await b.close()
console.log('OK')
