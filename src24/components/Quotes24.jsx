import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { QUOTES } from '../content.js'

const SHARP = [0.25, 0, 0.2, 1]
const ANCHORS = [
  { after: 'about', side: 'right', q: 6 },
  { after: 'schedule', side: 'left', q: 7 },
  { after: 'speakers', side: 'right', q: 8 },
  { after: 'faq', side: 'left', q: 9 },
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

/* Красная звезда-печать (контур, как штамп ОТК) */
function StampStar() {
  const pts = []
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? 42 : 42 * 0.382
    const a = -Math.PI / 2 + (i * Math.PI) / 5
    pts.push(`${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`)
  }
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" aria-hidden="true">
      <polygon points={pts.join(' ')} stroke="#e04e39" strokeWidth="5" strokeLinejoin="round" />
      <circle cx="50" cy="50" r="47" stroke="#e04e39" strokeWidth="2.5" opacity="0.7" />
    </svg>
  )
}

/* Цитаты v24 «Штамповка»: заводская бирка со срезанным углом и пробитым
   отверстием. Впечатывается ударом (резкая посадка + тень-выхлоп),
   после удара штампуется красная звезда-печать. Никакого парения —
   индустриальная неподвижность. */
export default function Quotes24() {
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
            <motion.div
              className="relative"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.18, y: -12, rotate: left ? -2.2 : 2.2 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0, rotate: left ? -0.6 : 0.6 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, ease: SHARP }}
            >
              {/* Тень-выхлоп в момент удара */}
              {!reduceMotion && (
                <motion.span
                  className="absolute inset-x-6 -bottom-2 h-6 rounded-full bg-black/45 blur-xl"
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: [0, 0.6, 0.22], scale: [0.6, 1.15, 1] }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: 0.3, times: [0, 0.4, 1] }}
                />
              )}
              <div className="qp24-shadow">
                <div className="qp24 relative px-8 py-7 sm:px-9 sm:py-8 pr-12">
                  <span className="qp24-hole absolute top-3 left-3" aria-hidden="true" />
                  <p className="text-[#3d3831] font-semibold text-[15px] sm:text-[16px] leading-relaxed pl-4 text-balance">
                    {QUOTES[q]}
                  </p>
                </div>
              </div>
              {/* Звезда-печать: штампуется после посадки бирки */}
              <motion.span
                className="absolute -bottom-4 -right-2 w-14 h-14 sm:w-16 sm:h-16 -rotate-12"
                style={{ filter: 'drop-shadow(0 0 2px rgba(224,78,57,0.45))' }}
                initial={reduceMotion ? { opacity: 0.75 } : { opacity: 0, scale: 1.9 }}
                whileInView={reduceMotion ? { opacity: 0.75 } : { opacity: [0, 0.9, 0.75], scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.32, delay: 0.44, ease: SHARP }}
              >
                <StampStar />
              </motion.span>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
