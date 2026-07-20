import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { QUOTES } from '../content.js'

const EASE = [0.19, 1, 0.22, 1]
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

/* Цитаты v29 «Путевые заметки»: приколотая к карте бумажная карточка —
   пунктирная рамка, красная булавка, лёгкий поворот при «приколке». */
export default function Quotes29() {
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
              left ? 'left-[max(10px,3vw)]' : 'right-[max(10px,3vw)]'
            }`}
            style={{ top: tops[i] }}
          >
            <motion.div
              initial={reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -30, rotate: left ? -6 : 6, scale: 1.04 }}
              whileInView={reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, rotate: left ? -1.6 : 1.6, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div className="note29 relative px-7 py-6 pt-8">
                <span className="note29-pin absolute top-3 left-1/2 -translate-x-1/2" />
                <p className="text-[#3d3831] font-medium text-[14.5px] sm:text-[16px] leading-relaxed text-balance">
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
