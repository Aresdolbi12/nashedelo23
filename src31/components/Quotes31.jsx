import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { QUOTES } from '../content.js'

const EASE = [0.65, 0, 0.35, 1]
const THREAD_EASE = [0.19, 1, 0.22, 1]
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

/* Нить-скоба (стиль нитей «О нас пишут»): выезжает вместе с плитой и
   рисуется после её появления, огибая плиту с центральной стороны —
   проходит над и под плитой и обходит её ближний к центру край,
   не пересекая саму плиту. Скрыта на мобильных. */
function Thread31({ left, run, id }) {
  const d = left
    ? 'M 800 20 H 528 a 44 44 0 0 0 -44 44 v 172 a 44 44 0 0 0 44 44 H 800'
    : 'M -40 20 H 232 a 44 44 0 0 1 44 44 v 172 a 44 44 0 0 1 -44 44 H -40'
  return (
    <svg
      className={`absolute -top-10 -bottom-10 hidden md:block pointer-events-none ${
        left ? 'left-0 -right-80 w-[calc(100%+20rem)]' : 'right-0 -left-80 w-[calc(100%+20rem)]'
      }`}
      style={{ height: 'calc(100% + 5rem)' }}
      viewBox="0 0 760 300"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1={left ? '1' : '0'} y1="0" x2={left ? '0' : '1'} y2="0.25">
          <stop offset="0" stopColor="#f6e9d8" />
          <stop offset="0.5" stopColor="#d9bfa8" />
          <stop offset="1" stopColor="#8f6f52" />
        </linearGradient>
      </defs>
      <motion.path
        d={d}
        className="thread17"
        stroke={`url(#${id})`}
        strokeWidth="3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={run ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ pathLength: { duration: 1.5, ease: THREAD_EASE, delay: 0.85 }, opacity: { duration: 0.3, delay: 0.85 } }}
      />
    </svg>
  )
}

/* Гравированная плита v25 + нить-скоба */
function Plate({ quote, left, reduceMotion, id }) {
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
      {!reduceMotion && <Thread31 left={left} run={run} id={id} />}
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

/* Цитаты v31: гравированные плиты v25, к каждой — нить-скоба
   в стиле нитей прессы, огибающая плиту с центральной стороны. */
export default function Quotes31() {
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
            <Plate quote={QUOTES[q]} left={left} reduceMotion={reduceMotion} id={`qthread31-${i}`} />
          </div>
        )
      })}
    </div>
  )
}
