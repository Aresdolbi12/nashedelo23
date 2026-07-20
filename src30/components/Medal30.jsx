import { motion, useReducedMotion } from 'framer-motion'

/* Орден-медальон: звезда в двойном гравированном кольце.
   Рисуется штрих за штрихом над логотипом, затем тихо мерцает. */
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

const STAR = starPath(60, 60, 34)

export default function Medal30() {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <svg viewBox="0 0 120 120" className="w-20 h-20 md:w-24 md:h-24" fill="none" aria-hidden="true">
        <circle cx="60" cy="60" r="56" stroke="rgba(217,191,168,0.5)" strokeWidth="1.5" strokeDasharray="2 5" />
        <circle cx="60" cy="60" r="46" stroke="rgba(217,191,168,0.6)" strokeWidth="1.5" />
        <path d={STAR} stroke="rgba(235,220,207,0.75)" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 120 120" className="w-20 h-20 md:w-24 md:h-24" fill="none" aria-hidden="true">
      <motion.circle
        cx="60" cy="60" r="56"
        stroke="rgba(217,191,168,0.5)" strokeWidth="1.5" strokeDasharray="2 5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, rotate: 360 }}
        transition={{ opacity: { duration: 0.8, delay: 1.0 }, rotate: { duration: 120, repeat: Infinity, ease: 'linear' } }}
        style={{ transformOrigin: '60px 60px' }}
      />
      <motion.circle
        cx="60" cy="60" r="46"
        stroke="rgba(217,191,168,0.6)" strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut', delay: 1.1 }}
      />
      <motion.path
        d={STAR}
        stroke="rgba(235,220,207,0.85)" strokeWidth="2" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ pathLength: { duration: 1.6, ease: 'easeInOut', delay: 1.5 }, opacity: { duration: 0.3, delay: 1.5 } }}
      />
      <motion.path
        d={STAR}
        stroke="rgba(224,78,57,0.5)" strokeWidth="2" strokeLinejoin="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0.15, 0.5] }}
        transition={{ delay: 3.4, duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  )
}
