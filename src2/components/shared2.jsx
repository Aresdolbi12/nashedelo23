import { useEffect, useRef, useState } from 'react'
import { animate, motion } from 'framer-motion'

export const EASE = [0.19, 1, 0.22, 1] // ease-out-expo

export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export const staggerGroup = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

export function Reveal({ children, className, variants = fadeUp, ...rest }) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-70px' }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/* Штамп чертежа — фирменная «основная надпись» раздела.
   Виден по умолчанию; анимация — только сдвиг/прозрачность (без clip-path,
   он молча ломает whileInView и оставляет элемент невидимым). */
const stampVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
}

export function Stamp({ num, name, className = '' }) {
  return (
    <motion.div
      className={`stamp ${className}`}
      variants={stampVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      <span className="stamp-num">лист {num}</span>
      <span className="stamp-name">{name}</span>
    </motion.div>
  )
}

/* Размерная линия (как на чертеже): |<---- текст ---->| */
export function DimensionLine({ label, className = '' }) {
  return (
    <motion.div
      className={`flex items-center gap-2 text-[color:var(--steel)] ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      aria-hidden="true"
    >
      <motion.svg
        width="100%"
        height="12"
        className="overflow-visible"
        preserveAspectRatio="none"
        viewBox="0 0 100 12"
      >
        <motion.line
          x1="0" y1="6" x2="100" y2="6"
          stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke"
          variants={{
            hidden: { pathLength: 0 },
            visible: { pathLength: 1, transition: { duration: 0.9, ease: EASE } },
          }}
        />
        <line x1="0.5" y1="0" x2="0.5" y2="12" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <line x1="99.5" y1="0" x2="99.5" y2="12" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </motion.svg>
      {label && <span className="text-[11px] tracking-widest uppercase whitespace-nowrap font-semibold">{label}</span>}
    </motion.div>
  )
}

/* Счётчик от 0 при попадании во viewport (нативный IO — надёжнее useInView) */
export function Counter({ value, suffix = '', duration = 1.4 }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let controls
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        controls = animate(0, value, {
          duration,
          ease: [0.19, 1, 0.22, 1],
          onUpdate: (v) => setDisplay(Math.round(v)),
        })
      },
      { rootMargin: '-40px' },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      controls?.stop()
    }
  }, [value, duration])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export function Rivets() {
  return (
    <>
      <span className="rivet" style={{ top: 7, left: 7 }} />
      <span className="rivet" style={{ top: 7, right: 7 }} />
      <span className="rivet" style={{ bottom: 7, left: 7 }} />
      <span className="rivet" style={{ bottom: 7, right: 7 }} />
    </>
  )
}

export function ArrowIcon({ size = 18, strokeWidth = 2.5, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}
