import { motion, useReducedMotion } from 'framer-motion'
import Logo15 from './Logo15.jsx'

const HARD = [0.16, 1, 0.3, 1]

/* «Специмен»: буквы влетают жёстко, без размытия — как литеры в верстатку.
   При наведении буква приподнимается (интерактивная гарнитура). */
const ROWS = [
  { text: 'НАШЕ', cls: 'text-[clamp(2.6rem,11vw,5.8rem)] tracking-[0.16em]' },
  { text: 'ДЕЛО', cls: 'text-[clamp(3.9rem,16.5vw,8.6rem)] -mt-[0.1em]' },
]

export default function LogoFx28() {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) return <Logo15 size="poster" shine />

  let letterIndex = 0
  return (
    <motion.span
      className="inline-block text-center"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.06, delayChildren: 0.95 }}
    >
      {ROWS.map(({ text, cls }) => (
        <span key={text} className={`block ${cls}`}>
          {text.split('').map((ch, i) => {
            const idx = letterIndex++
            return (
              <motion.span
                key={i}
                className="letter28 inline-block"
                variants={{
                  hidden: { opacity: 0, y: idx % 2 ? 130 : -130 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: HARD } },
                }}
              >
                <span className="logo15 inline-block">{ch}</span>
              </motion.span>
            )
          })}
        </span>
      ))}
    </motion.span>
  )
}
