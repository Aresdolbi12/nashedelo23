import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { QUOTES } from '../content.js'

const EASE = [0.16, 1, 0.3, 1]
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

/* Цитаты v27 «Строка света»: без плашки — вертикальная световая черта
   разгорается, от неё проявляется текст, подсвеченный мягким ореолом. */
export default function Quotes27() {
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
            className={`absolute -translate-y-1/2 w-[min(420px,86vw)] ${
              left ? 'left-[max(14px,4vw)]' : 'right-[max(14px,4vw)]'
            }`}
            style={{ top: tops[i] }}
          >
            <div className="flex gap-5 items-stretch">
              <motion.span
                className="lightbar27 shrink-0 self-stretch"
                initial={reduceMotion ? { opacity: 0 } : { scaleY: 0, opacity: 0 }}
                whileInView={reduceMotion ? { opacity: 1 } : { scaleY: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: EASE }}
                style={{ originY: 0 }}
              />
              <motion.p
                className="glowtext27 text-[#ebdccf] font-medium text-[15px] sm:text-[17px] leading-relaxed py-1"
                initial={{ opacity: 0, x: left ? -14 : 14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
              >
                {QUOTES[q]}
              </motion.p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
