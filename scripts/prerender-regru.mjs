// Пререндер прод-сборки для reg.ru (нашедело23.рф).
//
// Проблема: SPA отдаёт поисковикам пустой <div id="root"></div> — для Яндекса
// сайта не существует. SSR чинить дорого (Countdown/карта/фон завязаны на DOM),
// поэтому headless-Chrome исполняет собранный сайт и мы сохраняем готовый DOM
// обратно в index.html. React при загрузке просто перерисует #root — а краулер
// увидит весь текст сразу.
//
// --virtual-time-budget промалывает таймеры/анимации мгновенно: интро-вуаль
// успевает раствориться, #boot удалиться, тексты — проявиться.
//
// Порядок: npm run build:regru → node scripts/prerender-regru.mjs (→ npm run og)

import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].find(existsSync)
if (!CHROME) throw new Error('Не найден Chrome/Edge для пререндера')

const built = resolve(root, 'dist-regru/index.html')
if (!existsSync(built)) throw new Error('Сначала собери сайт: npm run build:regru')

const src = readFileSync(built, 'utf8')
if (!/<div id="root"><\/div>/.test(src)) {
  console.log('index.html уже пререндерен (в #root есть контент) — пропускаю.')
  process.exit(0)
}

let dom = execFileSync(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--window-size=1280,900',
    '--virtual-time-budget=12000',
    '--dump-dom',
    'file:///' + built.replaceAll('\\', '/'),
  ],
  { maxBuffer: 128 * 1024 * 1024, encoding: 'utf8', timeout: 120000 },
)

// Проверки, что рендер реально случился — иначе оставляем исходник
const mustHave = ['Обучающая бизнес-программа', 'Частые вопросы', 'Белореченск']
for (const marker of mustHave) {
  if (!dom.includes(marker)) throw new Error(`Пререндер неполный: нет «${marker}» — index.html не тронут`)
}
if (/<div id="root"><\/div>/.test(dom)) throw new Error('Пререндер пуст: #root без контента — index.html не тронут')
if (/id="boot"/.test(dom)) throw new Error('В пререндере остался #boot (закрыл бы страницу) — index.html не тронут')

if (!/^<!DOCTYPE html>/i.test(dom.trimStart())) dom = '<!doctype html>\n' + dom

writeFileSync(built, dom, 'utf8')
console.log(`OK: пререндер записан (${(dom.length / 1024).toFixed(0)} КБ, было ${(src.length / 1024).toFixed(0)} КБ)`)
