import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { QUOTES } from '../content.js'

const EASE = [0.65, 0, 0.35, 1]
const ANCHORS = [
  { after: 'about', side: 'right', q: 9, ribbon: 'racetrack' },
  { after: 'schedule', side: 'left', q: 10, ribbon: 'racetrack' },
  { after: 'speakers', side: 'right', q: 11, ribbon: 'sweep' },
  { after: 'faq', side: 'left', q: 0, ribbon: 's-curve' },
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

/* Ленты-змейки в духе fadm.gov.ru/directions/grant: толстая линия (38px)
   с большими радиусными петлями заходит из-за края экрана, огибает плиту
   и проходит ЗА ней (плита непрозрачна и перекрывает ленту).
   Координаты: viewBox 1220x360, плита справа = x 700..1140, слева = 80..520,
   по вертикали 70..290. Скрыты на мобильных. */
const RIBBONS = {
  right: {
    racetrack: 'M 1260 34 H 420 A 105 105 0 0 0 315 139 A 105 105 0 0 0 420 244 H 1260',
    sweep: 'M -40 300 H 470 A 122 122 0 0 0 592 178 V 172 A 60 60 0 0 1 652 112 H 1260',
  },
  left: {
    racetrack: 'M -40 34 H 800 A 105 105 0 0 1 905 139 A 105 105 0 0 1 800 244 H -40',
    's-curve': 'M 1260 56 H 710 A 96 96 0 0 0 614 152 A 96 96 0 0 1 518 248 H -40',
  },
}

function Ribbon({ left, kind, run, reduceMotion }) {
  const d = RIBBONS[left ? 'left' : 'right'][kind] || RIBBONS[left ? 'left' : 'right'].racetrack
  return (
    <svg
      className={`absolute -top-16 -bottom-16 hidden md:block pointer-events-none ${
        left ? '-left-24 -right-[44rem] w-[calc(100%+47rem)]' : '-right-24 -left-[44rem] w-[calc(100%+47rem)]'
      }`}
      style={{ height: 'calc(100% + 8rem)' }}
      viewBox="0 0 1220 360"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        d={d}
        className="ribbon33"
        strokeWidth="38"
        strokeLinecap="round"
        initial={reduceMotion ? { opacity: 0 } : { pathLength: 0, opacity: 0 }}
        animate={
          reduceMotion
            ? run ? { opacity: 1 } : { opacity: 0 }
            : run ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }
        }
        transition={{ pathLength: { duration: 1.7, ease: 'easeInOut', delay: 0.35 }, opacity: { duration: 0.4, delay: 0.35 } }}
      />
    </svg>
  )
}

/* Гравированная плита v25 (непрозрачнее — перекрывает ленту) */
function Plate({ quote, left, ribbon, reduceMotion }) {
  const [run, setRun] = useState(false)
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      onViewportEnter={() => setRun(true)}
    >
      <Ribbon left={left} kind={ribbon} run={run} reduceMotion={reduceMotion} />
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

/* Цитаты v33: плиты v25 + ленты-змейки fadm из-за краёв экрана. */
export default function Quotes31() {
  const reduceMotion = useReducedMotion()
  const tops = useAnchorTops()
  if (!tops) return null

  return (
    <div className="absolute inset-0 -z-[5] overflow-hidden pointer-events-none" aria-hidden="true">
      {ANCHORS.map(({ after, side, q, ribbon }, i) => {
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
            <Plate quote={QUOTES[q]} left={left} ribbon={ribbon} reduceMotion={reduceMotion} />
          </div>
        )
      })}
    </div>
  )
}
