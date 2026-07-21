import { motion, useReducedMotion } from 'framer-motion'

/* Очертание военной пятиконечной звезды за hero (замена контурного «2026»).
   draw=false — статичный контур; draw=true — звезда динамично рисуется
   штрих за штрихом (как дом-чертёж варианта 2) и затем мягко пульсирует. */
function starPath(cx, cy, R) {
  const r = R * 0.382
  const pts = []
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5
    const rad = i % 2 === 0 ? R : r
    pts.push([(cx + rad * Math.cos(a)).toFixed(1), (cy + rad * Math.sin(a)).toFixed(1)])
  }
  return 'M ' + pts.map((p) => p.join(' ')).join(' L ') + ' Z'
}

const D = starPath(500, 520, 460)

export default function Star22({ draw = false }) {
  const reduceMotion = useReducedMotion()
  const animate = draw && !reduceMotion

  return (
    <svg
      viewBox="0 0 1000 1000"
      className="absolute left-1/2 top-[47%] -translate-x-1/2 -translate-y-1/2 w-[min(88vw,900px)] h-auto pointer-events-none z-0"
      fill="none"
      aria-hidden="true"
    >
      {/* Постоянный тихий контур */}
      <path d={D} stroke="rgba(217, 191, 168, 0.13)" strokeWidth="2.5" strokeLinejoin="round" />
      {animate && (
        <>
          {/* Отрисовка серебром штрих за штрихом */}
          <motion.path
            d={D}
            stroke="rgba(235, 220, 207, 0.5)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 1, 0.35] }}
            transition={{
              pathLength: { duration: 2.4, ease: 'easeInOut', delay: 1.0 },
              opacity: { duration: 3.4, times: [0, 0.15, 0.8, 1], delay: 1.0 },
            }}
          />
          {/* Мягкая пульсация после отрисовки */}
          <motion.path
            d={D}
            stroke="rgba(217, 191, 168, 0.35)"
            strokeWidth="2.5"
            strokeLinejoin="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.35, 0.1, 0.35] }}
            transition={{ delay: 3.7, duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}
    </svg>
  )
}
