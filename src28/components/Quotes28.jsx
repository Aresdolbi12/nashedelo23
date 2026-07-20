import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { QUOTES } from '../content.js'

const HARD = [0.16, 1, 0.3, 1]
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

/* Цитаты v28 «Плакатные»: крупный жирный текст без плашки, за ним —
   гигантская контурная кавычка; жёсткий сдвиг при появлении. */
export default function Quotes28() {
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
            className={`absolute -translate-y-1/2 w-[min(480px,88vw)] ${
              left ? 'left-[max(10px,3vw)]' : 'right-[max(10px,3vw)]'
            }`}
            style={{ top: tops[i] }}
          >
            <motion.div
              className="relative py-6"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: left ? -90 : 90 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: HARD }}
            >
              <span
                className="qmark28 absolute -top-8 -left-3 font-black leading-none text-[7rem] select-none"
                style={{ fontFamily: "'Unbounded', sans-serif" }}
              >
                «
              </span>
              <p className="relative text-[#f2ece3] font-extrabold text-[clamp(1.1rem,1.8vw,1.6rem)] leading-snug text-balance">
                {QUOTES[q]}
              </p>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
