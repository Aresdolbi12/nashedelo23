import { motion, useScroll, useTransform } from 'framer-motion'

/* Живое небо: фон светлеет от предрассветной стали к дневному небу,
   объёмные облака проявляются, к финалу встаёт солнце. Всё привязано к скроллу.

   Облака — не размытые овалы, а настоящая клубящаяся фактура: SVG feTurbulence
   (fractalNoise) прогоняется через feColorMatrix, который вырезает из шума мягкую
   белую массу с рваными краями. Два слоя на разной «глубине» дрейфуют с разной
   скоростью (параллакс) — так небо получает объём. */

/* Одно облачное поле: статичный фрактальный шум → мягкая белая масса.
   Фильтр считается один раз и кэшируется, слой потом просто двигается transform'ом. */
function CloudField({ id, baseFrequency, seed, octaves = 4, contrast, offset, blur = 2, opacity, className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ opacity }}
    >
      <defs>
        <filter id={id} x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB">
          <feTurbulence
            type="fractalNoise"
            baseFrequency={baseFrequency}
            numOctaves={octaves}
            seed={seed}
            stitchTiles="stitch"
            result="noise"
          />
          {/* RGB → белый; альфа = contrast·A − offset, вырезает клубы из шума */}
          <feColorMatrix
            in="noise"
            type="matrix"
            values={`0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 ${contrast} ${offset}`}
            result="mask"
          />
          <feGaussianBlur in="mask" stdDeviation={blur} />
        </filter>
      </defs>
      <rect width="1000" height="600" filter={`url(#${id})`} />
    </svg>
  )
}

export default function Bg12() {
  const { scrollYProgress } = useScroll()

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.5, 0.64, 1],
    ['#0c1e35', '#1e4976', '#3f6d9a', '#c2d9ea', '#e8f2f8', '#eef5fa'],
  )
  const cloudsOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1])
  const sunOpacity = useTransform(scrollYProgress, [0.62, 0.92], [0, 1])
  const horizonOpacity = useTransform(scrollYProgress, [0, 0.32], [1, 0])

  // Параллакс: дальний слой почти неподвижен, ближний уходит вверх заметнее
  const farY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])
  const nearY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%'])

  return (
    <motion.div className="bg-viewport11 fixed inset-0 -z-10 overflow-hidden" style={{ backgroundColor }} aria-hidden="true">
      {/* Дымка у горизонта в предрассветной части */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[45vh]"
        style={{
          opacity: horizonOpacity,
          background: 'linear-gradient(180deg, transparent, rgba(120,160,200,0.35) 55%, rgba(190,212,235,0.55))',
        }}
      />

      <motion.div className="absolute inset-0" style={{ opacity: cloudsOpacity }}>
        {/* Дальний слой: мелкая частая фактура, высоко, медленный дрейф */}
        <motion.div className="cloud-layer cloud-far" style={{ y: farY }}>
          <CloudField
            id="cloud-far"
            className="cloud-svg"
            baseFrequency="0.010 0.018"
            seed={11}
            octaves={4}
            contrast={1.5}
            offset={-0.62}
            blur={2.4}
            opacity={0.55}
          />
        </motion.div>

        {/* Ближний слой: крупнее, ниже к горизонту, дрейф быстрее и в другую сторону */}
        <motion.div className="cloud-layer cloud-near" style={{ y: nearY }}>
          <CloudField
            id="cloud-near"
            className="cloud-svg"
            baseFrequency="0.006 0.012"
            seed={4}
            octaves={5}
            contrast={1.7}
            offset={-0.78}
            blur={1.6}
            opacity={0.85}
          />
        </motion.div>
      </motion.div>

      {/* Восходящее солнце */}
      <motion.div
        className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px]"
        style={{
          opacity: sunOpacity,
          background: 'radial-gradient(circle, rgba(255,252,240,0.95), rgba(255,248,225,0.35) 40%, transparent 70%)',
        }}
      />
    </motion.div>
  )
}
