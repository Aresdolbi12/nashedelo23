import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { QUOTES } from '../content.js'

const EASE = [0.19, 1, 0.22, 1]

/* Якоря: табличка висит на фоне, по центру пустой полосы
   сразу под указанной секцией (нижняя кромка секции = центр таблички). */
const ANCHORS = [
  { after: 'about', side: 'right' },
  { after: 'schedule', side: 'left' },
  { after: 'speakers', side: 'right' },
  { after: 'faq', side: 'left' },
]

/* Винт в углу таблички */
function Screw({ className }) {
  return (
    <span className={`plaque13-screw ${className}`} aria-hidden="true">
      <span className="plaque13-slot" />
    </span>
  )
}

/* Светящаяся нить-подводка (анимация «О нас пишут» из варианта 17):
   тянется из пустого пространства и дорисовывается к табличке */
function QuoteThread({ i, left }) {
  return (
    <svg
      className={`absolute top-1/2 -translate-y-1/2 h-24 w-[34vw] hidden md:block pointer-events-none ${
        left ? 'left-full -ml-2' : 'right-full -mr-2'
      }`}
      viewBox="0 0 400 100"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`qthread-${i}`} x1={left ? '1' : '0'} y1="0" x2={left ? '0' : '1'} y2="0">
          <stop offset="0" stopColor="#f6e9d8" />
          <stop offset="0.55" stopColor="#d9bfa8" />
          <stop offset="1" stopColor="#8f6f52" />
        </linearGradient>
      </defs>
      <motion.path
        d={left
          ? 'M 400 50 C 300 22, 160 78, 0 50'
          : 'M 0 50 C 100 78, 240 22, 400 50'}
        className="thread17"
        stroke={`url(#qthread-${i})`}
        strokeWidth="3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.5, ease: EASE, delay: 0.3 }}
      />
    </svg>
  )
}

/* Слой табличек-цитат НА ФОНЕ. offset задаёт вариант-специфичный набор
   цитат (шаг 3 по общему пулу) — в разных вариантах разные цитаты,
   выбор детерминированный, без повторов внутри страницы. */
export default function QuotePlaques15({ offset = 0 }) {
  const reduceMotion = useReducedMotion()
  const [tops, setTops] = useState(null)

  const picks = ANCHORS.map((_, i) => QUOTES[(offset * 3 + i) % QUOTES.length])

  useEffect(() => {
    const measure = () => {
      const next = ANCHORS.map(({ after }) => {
        const el = document.getElementById(after)
        return el ? Math.round(el.getBoundingClientRect().bottom + window.scrollY) : 0
      })
      setTops((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next))
    }
    measure()
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
            <QuoteThread i={i} left={left} />
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
                  {picks[i]}
                </p>
              </div>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
