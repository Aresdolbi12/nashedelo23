import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { QUOTES } from '../content.js'

const EASE = [0.65, 0, 0.35, 1]
const OUT = [0.16, 1, 0.3, 1]
const ANCHORS = [
  { after: 'about', side: 'right', q: 9, art: 'path' },
  { after: 'schedule', side: 'left', q: 10, art: 'builder' },
  { after: 'speakers', side: 'right', q: 11, art: 'loop' },
  { after: 'faq', side: 'left', q: 0, art: 'spiral' },
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

/* Тонкие металлические линии-акценты (1.5px, светлый металлик).
   Живут на кромке карточки (svg с полем 20px вокруг плиты, текст внутри
   плиты отступает от кромки ещё на ~30px — ближе 20px к тексту не подходят).
   Рисуются, когда карточка в зоне видимости; ~0.8–1s, ease-out. */
const STROKE = 'rgba(206, 212, 221, 0.6)'

/* 1. «Путь»: линия из левого нижнего угла дугой вдоль кромки вверх и за
   правый верхний угол; следом проявляется пунктирный след. */
function ArtPath({ run }) {
  const d = 'M 6 254 Q -4 130 40 32 Q 58 4 108 4 H 476'
  return (
    <svg className="absolute -inset-5 w-[calc(100%+2.5rem)] h-[calc(100%+2.5rem)] pointer-events-none" viewBox="0 0 470 250" preserveAspectRatio="none" fill="none" aria-hidden="true">
      <path d={d} stroke={STROKE} strokeWidth="1.5" strokeDasharray="2 7" vectorEffect="non-scaling-stroke" opacity="0" style={{ opacity: run ? 0.45 : 0, transition: 'opacity 0.7s 0.9s' }} />
      <motion.path
        d={d}
        stroke={STROKE}
        strokeWidth="1.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={run ? { pathLength: 1, opacity: [0, 1, 1, 0.25] } : { pathLength: 0, opacity: 0 }}
        transition={{ pathLength: { duration: 1, ease: OUT, delay: 0.5 }, opacity: { duration: 1.8, times: [0, 0.2, 0.7, 1], delay: 0.5 } }}
      />
    </svg>
  )
}

/* 2. «Конструктор»: штрихи выезжают из центра каждой стороны и замирают,
   не соединяясь в рамку. */
function ArtBuilder({ run }) {
  const segs = [
    { x1: 235, y1: 8, x2: 235, y2: 8, tx1: 185, tx2: 285, ty1: 8, ty2: 8, delay: 0.5 },
    { x1: 462, y1: 125, x2: 462, y2: 125, tx1: 462, tx2: 462, ty1: 83, ty2: 167, delay: 0.62 },
    { x1: 235, y1: 242, x2: 235, y2: 242, tx1: 285, tx2: 185, ty1: 242, ty2: 242, delay: 0.74 },
    { x1: 8, y1: 125, x2: 8, y2: 125, tx1: 8, tx2: 8, ty1: 167, ty2: 83, delay: 0.86 },
  ]
  return (
    <svg className="absolute -inset-5 w-[calc(100%+2.5rem)] h-[calc(100%+2.5rem)] pointer-events-none" viewBox="0 0 470 250" preserveAspectRatio="none" fill="none" aria-hidden="true">
      {segs.map(({ x1, y1, x2, y2, tx1, tx2, ty1, ty2, delay }, i) => (
        <motion.line
          key={i}
          stroke={STROKE}
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ x1, y1, x2, y2, opacity: 0 }}
          animate={run ? { x1: tx1, y1: ty1, x2: tx2, y2: ty2, opacity: 0.8 } : { x1, y1, x2, y2, opacity: 0 }}
          transition={{ duration: 0.6, ease: OUT, delay }}
        />
      ))}
    </svg>
  )
}

/* 3. «Петля»: линия под нижней кромкой слева направо с изящным
   завитком-росчерком по центру. */
function ArtLoop({ run }) {
  const d = 'M -12 246 H 168 c 26 0 32 -8 34 -16 a 12 12 0 0 0 -24 -2 c 0 16 24 18 48 18 H 482'
  return (
    <svg className="absolute -inset-5 w-[calc(100%+2.5rem)] h-[calc(100%+2.5rem)] pointer-events-none" viewBox="0 0 470 250" preserveAspectRatio="none" fill="none" aria-hidden="true">
      <motion.path
        d={d}
        stroke={STROKE}
        strokeWidth="1.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={run ? { pathLength: 1, opacity: 0.85 } : { pathLength: 0, opacity: 0 }}
        transition={{ pathLength: { duration: 1, ease: OUT, delay: 0.5 }, opacity: { duration: 0.3, delay: 0.5 } }}
      />
    </svg>
  )
}

/* 4. «Спираль»: в правом нижнем углу раскручивается наружу тонкая спираль
   на два с половиной витка — плита будто прикручена к фону. */
function spiralD(cx, cy) {
  const pts = []
  const turns = 2.4
  const steps = 64
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * turns * Math.PI * 2
    const r = 2 + t * 1.75
    pts.push(`${(cx + r * Math.cos(t)).toFixed(1)} ${(cy + r * Math.sin(t)).toFixed(1)}`)
  }
  return 'M ' + pts.join(' L ')
}

function ArtSpiral({ run }) {
  return (
    <svg className="absolute -inset-5 w-[calc(100%+2.5rem)] h-[calc(100%+2.5rem)] pointer-events-none" viewBox="0 0 470 250" preserveAspectRatio="none" fill="none" aria-hidden="true">
      <motion.path
        d={spiralD(432, 222)}
        stroke={STROKE}
        strokeWidth="1.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={run ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
        transition={{ pathLength: { duration: 0.95, ease: OUT, delay: 0.5 }, opacity: { duration: 0.3, delay: 0.5 } }}
      />
    </svg>
  )
}

const ARTS = { path: ArtPath, builder: ArtBuilder, loop: ArtLoop, spiral: ArtSpiral }

/* Гравированная плита v25 + своя линия-акцент у каждой карточки */
function Plate({ quote, art, reduceMotion }) {
  const [run, setRun] = useState(false)
  const Art = ARTS[art]
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      onViewportEnter={() => setRun(true)}
    >
      {!reduceMotion && <Art run={run} />}
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

/* Цитаты v32: плиты v25, у каждой карточки своя тонкая линия-акцент —
   «Путь», «Конструктор», «Петля», «Спираль» (ТЗ заказчика 21.07). */
export default function Quotes31() {
  const reduceMotion = useReducedMotion()
  const tops = useAnchorTops()
  if (!tops) return null

  return (
    <div className="absolute inset-0 -z-[5] overflow-hidden pointer-events-none" aria-hidden="true">
      {ANCHORS.map(({ after, side, q, art }, i) => {
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
            <Plate quote={QUOTES[q]} art={art} reduceMotion={reduceMotion} />
          </div>
        )
      })}
    </div>
  )
}
