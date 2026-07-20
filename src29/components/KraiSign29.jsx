import { motion, useReducedMotion } from 'framer-motion'
import { SCHEDULE } from '../content.js'

const OUTLINE = 'M 150 70 Q 100 120 130 170 Q 160 210 150 300 Q 145 400 165 480 Q 90 520 100 560 Q 160 580 230 590 Q 240 620 290 640 Q 380 680 470 720 Q 570 770 660 810 Q 720 830 740 790 Q 700 740 760 700 Q 820 650 800 560 Q 790 480 760 430 Q 730 380 740 300 Q 745 240 680 220 Q 560 180 440 160 Q 300 140 220 110 Q 180 95 150 70 Z'
const COORDS = {
  'Белореченск': [500, 560],
  'Армавир': [680, 460],
  'Ейск': [150, 150],
  'Новороссийск': [280, 600],
  'Сочи': [650, 780],
  'Тимашевск': [330, 330],
  'Краснодар': [430, 430],
}

/* Знак hero v29: вместо звезды — тихий контур края, рисующийся штрихом,
   с семью пульсирующими огоньками городов. */
export default function KraiSign29() {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      viewBox="0 0 900 880"
      className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 w-[min(80vw,760px)] h-auto pointer-events-none z-0"
      fill="none"
      aria-hidden="true"
    >
      <g transform="translate(-50,-20)">
        {reduceMotion ? (
          <path d={OUTLINE} stroke="rgba(217, 191, 168, 0.14)" strokeWidth="2.5" strokeLinejoin="round" />
        ) : (
          <>
            <path d={OUTLINE} stroke="rgba(217, 191, 168, 0.1)" strokeWidth="2.5" strokeLinejoin="round" />
            <motion.path
              d={OUTLINE}
              stroke="rgba(235, 220, 207, 0.4)"
              strokeWidth="2.5"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 1, 1, 0.3] }}
              transition={{
                pathLength: { duration: 2.6, ease: 'easeInOut', delay: 1.0 },
                opacity: { duration: 3.8, times: [0, 0.15, 0.8, 1], delay: 1.0 },
              }}
            />
            {Object.values(COORDS).map(([x, y], i) => (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="6"
                fill="rgba(217, 191, 168, 0.5)"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.7, 0.25, 0.7] }}
                transition={{ delay: 3 + i * 0.2, duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </>
        )}
      </g>
    </svg>
  )
}
