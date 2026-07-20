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

/* Цитаты v30 «Грамота»: центрированная плита с двойной рамкой,
   ромбы сверху и снизу; разворачивается по вертикали как свиток. */
export default function Quotes30() {
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
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(520px,88vw)]"
            style={{ top: tops[i] }}
          >
            <motion.div
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scaleY: 0.4 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, scaleY: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: EASE }}
              style={{ originY: 0.5 }}
            >
              <div className="charter30 relative px-9 py-8 text-center">
                <span className="charter30-d absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45" aria-hidden="true" />
                <p className="text-[#e7d9c6] text-[15px] sm:text-[16.5px] leading-relaxed tracking-[0.01em]">
                  {QUOTES[q]}
                </p>
                <span className="charter30-d absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45" aria-hidden="true" />
              </div>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
