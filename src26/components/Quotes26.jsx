import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { QUOTES } from '../content.js'

const EASE = [0.19, 1, 0.22, 1]
const ANCHORS = [
  { after: 'about', q: 9 },
  { after: 'schedule', q: 10 },
  { after: 'speakers', q: 11 },
  { after: 'faq', q: 0 },
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

/* Цитаты v26 «Интертитры»: карточки немого кино по центру пустых полос —
   тёмная плашка с двойной рамкой и уголками, текст всплывает как титр. */
export default function Quotes26() {
  const reduceMotion = useReducedMotion()
  const tops = useAnchorTops()
  if (!tops) return null

  return (
    <div className="absolute inset-0 -z-[5] overflow-hidden pointer-events-none" aria-hidden="true">
      {ANCHORS.map(({ after, q }, i) => {
        if (!tops[i]) return null
        return (
          <div
            key={after}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(560px,88vw)]"
            style={{ top: tops[i] }}
          >
            <motion.div
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.06, filter: 'blur(6px)' }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <div className="qt26 relative px-9 py-8 text-center">
                <span
                  className="block font-black leading-none text-[2rem] text-[#d9bfa8]/70 select-none"
                  style={{ fontFamily: "'Unbounded', sans-serif" }}
                >
                  «
                </span>
                <p className="text-[#ebdccf]/95 font-medium text-[15px] sm:text-[17px] leading-relaxed mt-2">
                  {QUOTES[q]}
                </p>
              </div>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
