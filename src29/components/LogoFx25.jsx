import { useReducedMotion } from 'framer-motion'
import Logo15 from './Logo15.jsx'

/* «Гравировка лучом»: логотип начинается пустым контуром, слева направо
   проходит световой луч и проявляет за собой металлическую заливку —
   как полировка гравировки. Затем — обычный блик. CSS-анимации
   (clip-path в CSS стабилен, в отличие от framer clip-path). */
const rows = (cls) => (
  <span className={`inline-block text-center ${cls}`}>
    <span className="block text-[clamp(2.6rem,11vw,5.8rem)] tracking-[0.16em]">НАШЕ</span>
    <span className="block text-[clamp(3.9rem,16.5vw,8.6rem)] -mt-[0.1em]">ДЕЛО</span>
  </span>
)

export default function LogoFx25() {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) return <Logo15 size="poster" shine />

  return (
    <span className="relative inline-block logo25-stage">
      {/* Слой 1: пустой контур — виден до прохода луча */}
      {rows('logo25-outline')}
      {/* Слой 2: металл, проявляющийся слева направо */}
      <span className="absolute inset-0 logo25-clip" aria-hidden="true">
        {rows('logo15')}
      </span>
      {/* Слой 3: бегущий световой луч на фронте проявления */}
      <span className="logo25-beam" aria-hidden="true" />
      {/* Слой 4: штатный блик после гравировки */}
      <span className="absolute inset-0 logo25-after" aria-hidden="true">
        {rows('logo15 logo15-shine')}
      </span>
    </span>
  )
}
