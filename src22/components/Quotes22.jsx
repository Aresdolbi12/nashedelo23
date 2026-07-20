import { useCallback, useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { QUOTES } from '../content.js'

const EASE = [0.16, 1, 0.3, 1]
const ANCHORS = [
  { after: 'about', side: 'right', q: 0 },
  { after: 'schedule', side: 'left', q: 1 },
  { after: 'speakers', side: 'right', q: 2 },
  { after: 'faq', side: 'left', q: 3 },
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

/* Цитаты v22 «Живой металл»: парящая бежевая пластина из того же материала,
   что логотип, — едва наклоняется за курсором, и по поверхности скользит
   блик, управляемый рукой посетителя. На тач — просто парение. */
export default function Quotes22() {
  const reduceMotion = useReducedMotion()
  const [fine, setFine] = useState(false)
  const tops = useAnchorTops()

  useEffect(() => {
    setFine(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 46, damping: 18 })
  const sy = useSpring(my, { stiffness: 46, damping: 18 })
  const rotY = useTransform(sx, [-1, 1], [-4, 4])
  const rotX = useTransform(sy, [-1, 1], [2.5, -2.5])
  const sheenX = useTransform(sx, [-1, 1], ['-130%', '330%'])

  const onMove = useCallback((e) => {
    mx.set((e.clientX / window.innerWidth) * 2 - 1)
    my.set((e.clientY / window.innerHeight) * 2 - 1)
  }, [mx, my])

  const live = fine && !reduceMotion
  useEffect(() => {
    if (!live) return
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [live, onMove])

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
            style={{ top: tops[i], perspective: 900 }}
          >
            <motion.div
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 46, scale: 0.94, filter: 'blur(8px)' }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.95, ease: EASE }}
            >
              <motion.div style={live ? { rotateX: rotX, rotateY: rotY } : undefined}>
                <div className="qp22 relative overflow-hidden px-8 py-7 sm:px-9 sm:py-8">
                  {live && (
                    <motion.span
                      className="absolute top-0 bottom-0 left-0 w-[38%]"
                      aria-hidden="true"
                      style={{
                        x: sheenX,
                        background:
                          'linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.42) 50%, transparent 100%)',
                      }}
                    />
                  )}
                  <span
                    className="relative block font-black leading-none text-[2.5rem] text-[#c58b68] select-none"
                    style={{
                      fontFamily: "'Unbounded', sans-serif",
                      textShadow: '0 1px 0 rgba(255,255,255,0.55), 0 -1px 1px rgba(98,59,42,0.3)',
                    }}
                  >
                    «
                  </span>
                  <p className="relative text-[#3d3831] font-medium text-[15px] sm:text-[17px] leading-relaxed mt-1 text-balance">
                    {QUOTES[q]}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
