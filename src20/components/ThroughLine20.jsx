import { useEffect, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

/* «Одна дорога»: единственная непрерывная металлическая линия прошивает
   весь сайт — стартует под логотипом, проходит через миссию и программу,
   вьётся по семи городам маршрута, касается плашек прессы и финиширует
   стрелкой в кнопке регистрации. Дорисовывается прогрессом скролла окна.

   Реализация: точки меряются по реальной вёрстке (селекторы ниже),
   путь — цепочка вертикальных S-кривых, пересчёт при ресайзе.
   Слой живёт за контентом (-z), на мобильных скрыт, при reduced-motion
   дорога нарисована сразу целиком. */

const ANCHORS = [
  { sel: '#top .logo-drift11', at: 'bottom', dx: 0 },
  { sel: '#about .grad-num15', at: 'left', dx: -60 },
  { sel: '#program .panel', at: 'right', dx: 70 },
  { sel: '.road-node20', at: 'center', all: true },
  { sel: '#press .plaque13', at: 'center', all: true },
  { sel: '#register .btn-ink', at: 'top', dx: 0, dy: -28 },
]

function pointOf(el, at, dx = 0, dy = 0) {
  const r = el.getBoundingClientRect()
  const y = window.scrollY
  if (at === 'bottom') return [r.left + r.width / 2 + dx, r.bottom + y + 26 + dy]
  if (at === 'top') return [r.left + r.width / 2 + dx, r.top + y + dy]
  if (at === 'left') return [Math.max(40, r.left + dx), r.top + y + r.height / 2 + dy]
  if (at === 'right') return [Math.min(window.innerWidth - 40, r.right + dx), r.top + y + r.height / 2 + dy]
  return [r.left + r.width / 2 + dx, r.top + y + r.height / 2 + dy]
}

function buildPath(points) {
  if (points.length < 2) return ''
  let d = `M ${points[0][0]} ${points[0][1]}`
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1]
    const [x1, y1] = points[i]
    const bend = Math.min(220, Math.max(70, (y1 - y0) * 0.45))
    d += ` C ${x0} ${y0 + bend}, ${x1} ${y1 - bend}, ${x1} ${y1}`
  }
  return d
}

export default function ThroughLine20() {
  const reduceMotion = useReducedMotion()
  const [geo, setGeo] = useState(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 })

  useEffect(() => {
    let t = 0
    const measure = () => {
      clearTimeout(t)
      /* setTimeout, не rAF: rAF заморожен в скрытых вкладках, и дорога
         не построилась бы до первого показа окна */
      t = setTimeout(() => {
        if (window.innerWidth < 768) { setGeo(null); return }
        const pts = []
        for (const { sel, at, dx, dy, all } of ANCHORS) {
          const els = all ? [...document.querySelectorAll(sel)] : [document.querySelector(sel)].filter(Boolean)
          for (const el of els) pts.push(pointOf(el, at, dx, dy))
        }
        pts.sort((a, b) => a[1] - b[1])
        if (pts.length < 3) { setGeo(null); return }
        setGeo({
          d: buildPath(pts),
          h: document.documentElement.scrollHeight,
          w: document.documentElement.clientWidth,
          end: pts[pts.length - 1],
        })
      }, 60)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); clearTimeout(t) }
  }, [])

  if (!geo) return null

  const drawn = reduceMotion ? 1 : progress

  return (
    <div
      className="absolute inset-x-0 top-0 -z-[4] hidden md:block pointer-events-none"
      style={{ height: geo.h }}
      aria-hidden="true"
    >
      <svg width={geo.w} height={geo.h} className="absolute inset-0" fill="none">
        <defs>
          <linearGradient id="road20" x1="0" y1="0" x2="0" y2={geo.h} gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#eef1f4" />
            <stop offset="0.3" stopColor="#aeb9c4" />
            <stop offset="0.55" stopColor="#dfe5ea" />
            <stop offset="0.8" stopColor="#9fa9b7" />
            <stop offset="1" stopColor="#d9bfa8" />
          </linearGradient>
        </defs>
        {/* Призрачная трасса всего пути — видно, куда ведёт дорога */}
        <path d={geo.d} stroke="rgba(235, 220, 207, 0.09)" strokeWidth="10" strokeLinecap="round" />
        {/* Тёмная кромка дороги (объём) */}
        <motion.path
          d={geo.d}
          stroke="rgba(6, 20, 14, 0.6)"
          strokeWidth="13"
          strokeLinecap="round"
          style={{ pathLength: drawn }}
        />
        {/* Металлическое полотно */}
        <motion.path
          d={geo.d}
          stroke="url(#road20)"
          strokeWidth="8"
          strokeLinecap="round"
          style={{ pathLength: drawn }}
        />
        {/* Финишная стрелка у кнопки регистрации */}
        <motion.g
          style={{ opacity: reduceMotion ? 1 : undefined }}
          initial={false}
          transform={`translate(${geo.end[0]}, ${geo.end[1]})`}
        >
          <motion.polygon
            points="-9,-16 9,-16 0,0"
            fill="#d9bfa8"
            stroke="rgba(6,20,14,0.5)"
            strokeWidth="1.5"
            style={reduceMotion ? {} : { opacity: progress }}
          />
        </motion.g>
      </svg>
    </div>
  )
}
