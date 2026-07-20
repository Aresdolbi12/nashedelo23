import { motion, useReducedMotion } from 'framer-motion'
import Logo15 from './Logo15.jsx'

const EASE = [0.23, 1, 0.32, 1]

/* «Сборка по буквам»: каждая буква влетает со своим blur/поворотом
   и оседает; затем по буквам бесконечно перекатывается волна блеска.
   Волна (CSS filter) живёт на ВЛОЖЕННОМ span — иначе CSS-анимация
   перекрывает framer-вход по filter и сборка не видна вовсе. */
const ROWS = [
  { text: 'НАШЕ', cls: 'text-[clamp(2.6rem,11vw,5.8rem)] tracking-[0.16em]' },
  { text: 'ДЕЛО', cls: 'text-[clamp(3.9rem,16.5vw,8.6rem)] -mt-[0.1em]' },
]

const letterVariants = {
  hidden: (i) => ({
    opacity: 0,
    y: 60,
    scale: 1.35,
    rotate: i % 2 ? 7 : -7,
    filter: 'blur(14px)',
  }),
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE },
  },
}

export default function LogoFx23() {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) return <Logo15 size="poster" shine />

  let letterIndex = 0
  return (
    <motion.span
      className="inline-block text-center"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.09, delayChildren: 0.95 }}
    >
      {ROWS.map(({ text, cls }) => (
        <span key={text} className={`block ${cls}`}>
          {text.split('').map((ch, i) => {
            const idx = letterIndex++
            return (
              <motion.span
                key={i}
                className="inline-block"
                custom={idx}
                variants={letterVariants}
              >
                <span className="logo15 letter23 inline-block" style={{ '--ld': `${idx * 0.14}s` }}>
                  {ch}
                </span>
              </motion.span>
            )
          })}
        </span>
      ))}
    </motion.span>
  )
}
