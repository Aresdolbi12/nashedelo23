import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { QUOTES } from '../content.js'

const EASE = [0.19, 1, 0.22, 1]

/* Перемешивание Фишера–Йейтса: порядок цитат случайный при каждой загрузке */
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
const ORDER = shuffle(QUOTES)

/* Якоря: облако висит на фоне, по центру пустой небесной полосы
   сразу под указанной секцией (нижняя кромка секции = центр облака). */
const ANCHORS = [
  { after: 'about', side: 'right' },
  { after: 'schedule', side: 'left' },
  { after: 'speakers', side: 'right' },
  { after: 'faq', side: 'left' },
]

/* Кучевое облако: объёмный градиент (белый верх → голубоватое основание),
   рассеянная воздушная тень и облачко-спутник для глубины.
   suffix нужен, чтобы id градиентов не конфликтовали между экземплярами. */
function CloudSvg({ suffix }) {
  return (
    <svg viewBox="0 0 520 300" className="block w-full h-auto" aria-hidden="true">
      <defs>
        <linearGradient id={`cq-body-${suffix}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="72%" stopColor="#f4f9fd" />
          <stop offset="100%" stopColor="#dcebf6" />
        </linearGradient>
        <linearGradient id={`cq-shade-${suffix}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c6dcec" stopOpacity="0" />
          <stop offset="100%" stopColor="#b7d2e6" stopOpacity="0.55" />
        </linearGradient>
        <filter id={`cq-blur-${suffix}`} x="-40%" y="-200%" width="180%" height="500%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {/* Рассеянная воздушная тень под облаком */}
      <ellipse
        cx="262" cy="264" rx="180" ry="14"
        fill="#0f2847" opacity="0.09"
        filter={`url(#cq-blur-${suffix})`}
      />

      {/* Облачко-спутник для глубины */}
      <g opacity="0.55">
        <path
          fill={`url(#cq-body-${suffix})`}
          d="M472 96 C458 96 448 88 448 76 C448 66 456 58 466 57 C468 47 477 40 488 40 C497 40 505 45 508 53 C516 54 522 61 522 69 C522 84 510 96 496 96 Z"
        />
      </g>

      {/* Тело облака: пышный верх, мягко скруглённое основание */}
      <path
        fill={`url(#cq-body-${suffix})`}
        d="M96 246
           C52 246 22 216 26 180
           C8 152 28 116 64 112
           C70 74 106 48 144 58
           C162 24 206 10 240 28
           C262 6 300 4 324 24
           C352 4 394 16 408 48
           C446 44 478 72 478 108
           C506 122 518 156 502 186
           C512 218 486 246 452 246
           Z"
      />

      {/* Затенение нижней кромки — объём */}
      <path
        fill={`url(#cq-shade-${suffix})`}
        d="M96 246 C64 246 40 230 30 206 C48 226 72 236 100 236 L448 236 C476 236 496 224 504 202 C500 228 478 246 452 246 Z"
      />

      {/* Блик на верхнем куполе */}
      <path
        fill="#ffffff"
        opacity="0.8"
        d="M240 44 C258 28 288 26 308 40 C290 34 262 36 240 44 Z"
      />
    </svg>
  )
}

/* Слой облаков-цитат НА ФОНЕ: абсолютный слой с отрицательным z-index —
   контент страницы всегда рисуется поверх, скролл не удлиняется.
   Каждое облако центрируется на пустой небесной полосе между секциями
   (координаты меряются по реальной вёрстке и пересчитываются при ресайзе). */
export default function CloudQuotes12() {
  const reduceMotion = useReducedMotion()
  const [tops, setTops] = useState(null)

  useEffect(() => {
    const measure = () => {
      const next = ANCHORS.map(({ after }) => {
        const el = document.getElementById(after)
        return el ? Math.round(el.getBoundingClientRect().bottom + window.scrollY) : 0
      })
      setTops((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next))
    }
    measure()
    // Высоты меняются при ресайзе, догрузке шрифтов/картинок — следим за body
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    return () => ro.disconnect()
  }, [])

  if (!tops) return null

  return (
    <div className="absolute inset-0 -z-[5] overflow-hidden pointer-events-none" aria-hidden="true">
      {ANCHORS.map(({ after, side }, i) => {
        if (!tops[i]) return null
        const left = side === 'left'
        return (
          <div
            key={after}
            className={`absolute -translate-y-1/2 w-[min(430px,80vw)] ${
              left ? 'left-[max(8px,3vw)]' : 'right-[max(8px,3vw)]'
            }`}
            style={{ top: tops[i] }}
          >
            <motion.div
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: left ? '-90%' : '90%' }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 2, ease: EASE }}
            >
              <div className={`relative ${left ? 'cloud-drift12-l' : 'cloud-drift12-r'}`}>
                <CloudSvg suffix={i} />
                {/* Текст в безопасной зоне тела облака */}
                <div className="absolute left-[15%] right-[15%] top-[30%] bottom-[26%] flex items-center justify-center">
                  <p className="text-center text-[#1e4976] italic font-medium text-[13px] sm:text-[15px] leading-snug text-balance">
                    «{ORDER[i % ORDER.length]}»
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
