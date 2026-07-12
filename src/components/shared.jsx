import { useEffect, useRef, useState } from 'react'
import { animate, motion, useScroll, useTransform } from 'framer-motion'

export const EASE = [0.2, 0.8, 0.2, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export const staggerGroup = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
}

export function Reveal({ children, className, variants = fadeUp, ...rest }) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

/* Маркер раздела: точка + рисующаяся линия + надпись */
export function SectionTag({ index, label, center = false }) {
  return (
    <div className={`flex items-center gap-3 mb-6 ${center ? 'justify-center' : ''}`}>
      <span className="marker" />
      <motion.span
        className="h-px w-10 bg-[#1e4976] origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
      />
      <span className="text-xs tracking-[0.3em] uppercase font-semibold text-[#1e4976]">
        {index} — {label}
      </span>
    </div>
  )
}

/* Гигантский полупрозрачный номер секции с параллаксом */
export function SectionNum({ children, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [70, -70])
  return (
    <motion.div ref={ref} style={{ y }} className={`section-num-bg ${className}`} aria-hidden="true">
      {children}
    </motion.div>
  )
}

/* Анимированный счётчик от 0 при попадании во viewport */
export function Counter({ value, suffix = '', duration = 1.6 }) {
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
          ease: [0.2, 0.8, 0.2, 1],
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
