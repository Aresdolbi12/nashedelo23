import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

/* Световой рельс v27: тонкая линия света вдоль левого поля страницы.
   По ней вместе со скроллом едет «пакет света» — как сигнал по волокну.
   Скрыт на мобильных и при reduced-motion. */
export default function LightLine27() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const top = useTransform(scrollYProgress, [0, 1], ['2%', '96%'])

  if (reduceMotion) return null

  return (
    <div className="absolute inset-0 -z-[4] pointer-events-none hidden lg:block" aria-hidden="true">
      <div className="absolute left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#d9bfa8]/20 to-transparent" />
      <motion.span className="light-packet27 absolute left-10 -translate-x-1/2" style={{ top }} />
    </div>
  )
}
