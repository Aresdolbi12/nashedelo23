import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { QUOTES } from '../content.js'

const EASE = [0.65, 0, 0.35, 1]
const ANCHORS = [
  { after: 'about', side: 'right', q: 9 },
  { after: 'schedule', side: 'left', q: 10 },
  { after: 'speakers', side: 'right', q: 11 },
  { after: 'faq', side: 'left', q: 0 },
]

function useAnchorTops() {
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
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    return () => ro.disconnect()
  }, [])
  return tops
}

/* Одна гравированная плита: рамка рисуется штрихом, затем луч слева
   направо проявляет выгравированный текст (приём логотипа v25). */
function Plate({ quote, reduceMotion }) {
  const [run, setRun] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      onViewportEnter={() => setRun(true)}
    >
      <div className="qp25 relative px-8 py-7 sm:px-9 sm:py-8">
        <svg className="absolute inset-0 w-full h-full overflow-visible" fill="none" aria-hidden="true">
          <motion.rect
            x="0.75"
            y="0.75"
            rx="13"
            style={{ width: 'calc(100% - 1.5px)', height: 'calc(100% - 1.5px)' }}
            stroke="rgba(217, 191, 168, 0.6)"
            strokeWidth="1.5"
            initial={reduceMotion ? false : { pathLength: 0 }}
            animate={reduceMotion ? undefined : run ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.05, ease: EASE }}
          />
        </svg>
        <div className={`qp25-reveal relative ${run ? 'run' : ''}`}>
          <span
            className="qp25-engraved block font-black leading-none text-[2.2rem] text-[#e7d9c6]/85 select-none"
            style={{ fontFamily: "'Unbounded', sans-serif" }}
          >
            «
          </span>
          <p className="qp25-engraved text-[#e7d9c6] text-[15px] sm:text-[16.5px] leading-relaxed mt-1 tracking-[0.015em] text-balance">
            {quote}
          </p>
        </div>
        <span className={`qp25-beam ${run ? 'run' : ''}`} aria-hidden="true" />
      </div>
    </motion.div>
  )
}

/* Цитаты v25 «Гравировка лучом»: не карточка, а гравированная плита —
   контурная рамка на тёмном стекле, текст проявляется проходом луча. */
export default function Quotes25() {
  const reduceMotion = useReducedMotion()
  const tops = useAnchorTops()
  if (!tops) return null

  return (
    <div className="absolute inset-0 -z-[5] overflow-hidden pointer-events-none" aria-hidden="true">
      {ANCHORS.map(({ after, side, q }, i) => {
        if (!tops[i]) return null
        const left = side === 'left'
        return (
          <div
            key={after}
            className={`absolute -translate-y-1/2 w-[min(440px,88vw)] ${
              left ? 'left-[max(10px,3vw)]' : 'right-[max(10px,3vw)]'
            }`}
            style={{ top: tops[i] }}
          >
            <Plate quote={QUOTES[q]} reduceMotion={reduceMotion} />
          </div>
        )
      })}
    </div>
  )
}
