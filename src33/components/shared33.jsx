import { useEffect, useRef, useState } from 'react'
import { animate } from 'framer-motion'

/* Локальные копии из src2/components/shared2.jsx (2026-07-22):
   финальный вариант не должен зависеть от исторических папок черновиков */

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
