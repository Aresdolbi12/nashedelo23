import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { QUOTES } from '../content.js'

const EASE = [0.65, 0, 0.35, 1]
const OUT = [0.16, 1, 0.3, 1]
const ANCHORS = [
  { after: 'about', side: 'right', q: 9, art: 'wrapray' },
  { after: 'schedule', side: 'left', q: 10, art: 'wrapburst' },
  { after: 'speakers', side: 'right', q: 11, art: 'wave' },
  { after: 'faq', side: 'left', q: 0, art: 'star' },
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

/* Тонкие металлические линии-акценты (1.6px, светлый металлик в тон логотипа).
   svg с полем 20px вокруг плиты; текст внутри плиты отступает от кромки
   ещё на ~30px — ближе 15–20px к тексту линии не подходят.
   Триггер — появление карточки, рисование ~1s, плавное. */
const STROKE = 'rgba(206, 212, 221, 0.6)'

function ArtSvg({ children }) {
  return (
    <svg
      className="absolute -inset-5 w-[calc(100%+2.5rem)] h-[calc(100%+2.5rem)] pointer-events-none overflow-visible"
      viewBox="0 0 470 250"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

/* 1. Линия из-под левого нижнего угла огибает левую и верхнюю стороны,
   в правом верхнем углу — резкий изящный выброс-луч наружу, который тает. */
function ArtWrapRay({ run }) {
  return (
    <ArtSvg>
      <motion.path
        d="M 6 262 L 6 46 Q 6 6 46 6 L 432 6"
        stroke={STROKE}
        strokeWidth="1.6"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={run ? { pathLength: 1, opacity: 0.85 } : { pathLength: 0, opacity: 0 }}
        transition={{ pathLength: { duration: 0.85, ease: OUT, delay: 0.45 }, opacity: { duration: 0.25, delay: 0.45 } }}
      />
      <motion.path
        d="M 432 6 L 478 -40"
        stroke={STROKE}
        strokeWidth="1.6"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={run ? { pathLength: 1, opacity: [0, 1, 1, 0] } : { pathLength: 0, opacity: 0 }}
        transition={{
          pathLength: { duration: 0.3, ease: 'easeOut', delay: 1.25 },
          opacity: { duration: 1.1, times: [0, 0.25, 0.55, 1], delay: 1.25 },
        }}
      />
    </ArtSvg>
  )
}

/* 2. Линия стартует сверху, огибает правую и нижнюю стороны,
   в левом нижнем углу — выброс вниз-влево за край карточки. */
function ArtWrapBurst({ run }) {
  return (
    <ArtSvg>
      <motion.path
        d="M 446 -16 Q 464 8 464 44 L 464 200 Q 464 244 424 244 L 44 244 L -32 290"
        stroke={STROKE}
        strokeWidth="1.6"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={run ? { pathLength: 1, opacity: 0.85 } : { pathLength: 0, opacity: 0 }}
        transition={{ pathLength: { duration: 1.05, ease: OUT, delay: 0.45 }, opacity: { duration: 0.25, delay: 0.45 } }}
      />
    </ArtSvg>
  )
}

/* 3. Линия параллельно правой стороне с мягкой волной; в средней части —
   чёткий звёздный пик вправо, дальше движение до нижнего угла. */
function ArtWave({ run }) {
  return (
    <ArtSvg>
      <motion.path
        d="M 462 2 Q 452 32 462 60 Q 470 86 460 102 L 488 118 L 461 134 Q 452 162 462 192 Q 470 220 456 250"
        stroke={STROKE}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={run ? { pathLength: 1, opacity: 0.85 } : { pathLength: 0, opacity: 0 }}
        transition={{ pathLength: { duration: 1, ease: OUT, delay: 0.45 }, opacity: { duration: 0.25, delay: 0.45 } }}
      />
    </ArtSvg>
  )
}

/* 4. Упрощённый контур пятиконечной звезды в правом нижнем углу —
   прорисовывается по контуру, с мягким замедлением; прямой, но
   ненавязчивый символ мужества и перехода к мирному созиданию. */
function ArtStar({ run }) {
  return (
    <ArtSvg>
      <motion.path
        d="M 430.0 190.0 L 435.8 208.0 L 454.7 208.0 L 439.4 219.1 L 445.3 237.0 L 430.0 225.9 L 414.7 237.0 L 420.6 219.1 L 405.3 208.0 L 424.2 208.0 Z"
        stroke={STROKE}
        strokeWidth="1.6"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={run ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
        transition={{ pathLength: { duration: 1.15, ease: 'easeInOut', delay: 0.45 }, opacity: { duration: 0.25, delay: 0.45 } }}
      />
    </ArtSvg>
  )
}

const ARTS = { wrapray: ArtWrapRay, wrapburst: ArtWrapBurst, wave: ArtWave, star: ArtStar }

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

/* Цитаты v32 (ред. 2): плиты v25, у каждой карточки своя линия —
   обход с лучом, обход с выбросом, волна со звёздным пиком, звезда. */
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
