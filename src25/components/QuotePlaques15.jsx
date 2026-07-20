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

/* Якоря: табличка висит на фоне, по центру пустой небесной полосы
   сразу под указанной секцией (нижняя кромка секции = центр таблички). */
const ANCHORS = [
  { after: 'about', side: 'right' },
  { after: 'schedule', side: 'left' },
  { after: 'speakers', side: 'right' },
  { after: 'faq', side: 'left' },
]

/* Винт в углу таблички: шляпка с радиальным градиентом и прорезь под шлиц */
function Screw({ className }) {
  return (
    <span className={`plaque13-screw ${className}`} aria-hidden="true">
      <span className="plaque13-slot" />
    </span>
  )
}

/* Слой табличек-цитат НА ФОНЕ: абсолютный слой с отрицательным z-index —
   контент страницы всегда рисуется поверх, скролл не удлиняется.
   Табличка — светлое матовое железо в цвет логотипа: шлифованная пластина,
   гравированный текст, винты по углам и медленный пробегающий блик.
   Координаты меряются по реальной вёрстке и пересчитываются при ресайзе. */
export default function QuotePlaques15() {
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
            className={`absolute -translate-y-1/2 w-[min(460px,88vw)] ${
              left ? 'left-[max(10px,3vw)]' : 'right-[max(10px,3vw)]'
            }`}
            style={{ top: tops[i] }}
          >
            <motion.div
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: left ? '-70%' : '70%', rotate: left ? -1.5 : 1.5 }}
              whileInView={{ opacity: 1, x: 0, rotate: left ? -0.4 : 0.4 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.4, ease: EASE }}
            >
              <div className="plaque13 relative px-9 py-8 sm:px-11 sm:py-9">
                <Screw className="top-2.5 left-2.5" />
                <Screw className="top-2.5 right-2.5" />
                <Screw className="bottom-2.5 left-2.5" />
                <Screw className="bottom-2.5 right-2.5" />
                <p className="plaque13-text text-center uppercase font-semibold text-[11.5px] sm:text-[13px] leading-relaxed tracking-[0.08em] text-balance">
                  {ORDER[i % ORDER.length]}
                </p>
              </div>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
