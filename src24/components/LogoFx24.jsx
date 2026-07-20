import { motion, useReducedMotion } from 'framer-motion'
import Logo15 from './Logo15.jsx'

/* «Штамповка»: логотип впечатывается в страницу как пресс в сталь —
   падает из глубины, в момент удара вспышка, короткая встряска
   и разлёт искр. Индустриальный характер конструкции Форума. */
const SPARKS = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2
  const dist = 90 + (i % 3) * 55
  return {
    x: Math.cos(a) * dist,
    y: Math.sin(a) * dist * 0.55,
    size: 3 + (i % 3),
    delay: 0.94 + (i % 4) * 0.015,
  }
})

export default function LogoFx24() {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) return <Logo15 size="poster" shine />

  return (
    <motion.span
      className="relative inline-block"
      animate={{ x: [0, 0, -3, 3, -2, 0] }}
      transition={{ duration: 0.4, delay: 0.95, times: [0, 0.01, 0.3, 0.55, 0.8, 1] }}
    >
      {/* Пресс: падение из глубины */}
      <motion.span
        className="inline-block"
        initial={{ opacity: 0, scale: 1.7, filter: 'blur(16px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.55, ease: [0.3, 0, 0.25, 1], delay: 0.45 }}
      >
        <Logo15 size="poster" shine />
      </motion.span>

      {/* Вспышка удара */}
      <motion.span
        className="absolute inset-[-18%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(246,239,230,0.55), transparent 65%)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0] }}
        transition={{ duration: 0.5, delay: 0.93, times: [0, 0.25, 1] }}
        aria-hidden="true"
      />

      {/* Искры */}
      {SPARKS.map(({ x, y, size, delay }, i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-[68%] rounded-full pointer-events-none"
          style={{
            width: size,
            height: size,
            background: i % 2 ? '#f2e9de' : '#d9bfa8',
            boxShadow: '0 0 8px 2px rgba(217,191,168,0.5)',
          }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], x, y }}
          transition={{ duration: 0.8, delay, ease: [0.1, 0.6, 0.4, 1] }}
          aria-hidden="true"
        />
      ))}
    </motion.span>
  )
}
