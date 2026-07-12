import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowIcon, Counter, EASE } from './shared.jsx'

const CLOUDS = [
  { width: 420, height: 120, top: '18%', left: '-5%', opacity: 0.8, drift: '80s', depth: 60 },
  { width: 320, height: 90, top: '28%', right: '5%', opacity: 0.7, drift: '110s', depth: 100 },
  { width: 260, height: 80, top: '55%', left: '15%', opacity: 0.55, drift: '95s', depth: 140 },
  { width: 380, height: 110, top: '70%', right: '-8%', opacity: 0.65, drift: '70s', depth: 90 },
  { width: 200, height: 70, top: '40%', left: '50%', opacity: 0.5, drift: '120s', depth: 170 },
]

const STATS = [
  { value: 2, label: 'дня интенсива' },
  { value: 9, label: 'экспертов-практиков' },
  { value: 7, label: 'городов' },
  { value: 100, suffix: '%', label: 'бесплатно' },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
}

const item = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } },
}

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()

  return (
    <section id="top" className="sky grain min-h-screen flex items-center pt-24 pb-16">
      {CLOUDS.map((c, i) => (
        <ParallaxCloud key={i} cloud={c} scrollY={scrollY} reduceMotion={reduceMotion} />
      ))}

      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full relative z-10">
        <motion.div className="max-w-4xl" variants={container} initial="hidden" animate="visible">
          <motion.div variants={item} className="flex items-center gap-3 mb-8">
            <div className="h-px w-12 bg-[#1e4976]" />
            <span className="text-xs tracking-[0.3em] uppercase font-semibold text-[#1e4976]">
              Образовательная программа
            </span>
          </motion.div>

          <h1 className="font-display font-black text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] text-[#0f2847] mb-6">
            <motion.span variants={item} className="block">
              Наше
            </motion.span>
            <motion.span variants={item} className="block relative">
              <span className="text-outline">дело</span>
              <motion.svg
                className="absolute -bottom-2 left-0 w-[3.6em]"
                height="14"
                viewBox="0 0 300 14"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M2 10 Q 75 2, 150 8 T 298 6"
                  stroke="#1e4976"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: EASE, delay: 1 }}
                />
              </motion.svg>
            </motion.span>
          </h1>

          <motion.p
            variants={item}
            className="text-lg md:text-xl text-[#1e3a5f] max-w-2xl leading-relaxed mb-10 font-light"
          >
            Практическая образовательная программа для ветеранов боевых действий, участников СВО и их
            семей. От идеи до устойчивого бизнеса — с экспертами, поддержкой и ясным планом.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4 items-center">
            <a
              href="#register"
              className="btn-primary px-8 py-4 rounded-sm text-sm font-bold tracking-wider uppercase inline-flex items-center gap-3"
            >
              <span className="shine" />
              Записаться на программу
              <ArrowIcon className="arrow" />
            </a>
            <a href="#about" className="btn-ghost px-8 py-4 rounded-sm text-sm font-semibold tracking-wide uppercase">
              Узнать больше
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl">
            {STATS.map(({ value, suffix, label }) => (
              <div key={label}>
                <div className="font-display font-black text-3xl md:text-4xl text-[#0f2847]">
                  <Counter value={value} suffix={suffix} />
                </div>
                <div className="text-xs uppercase tracking-wider text-gray-600 mt-1">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#1e4976] opacity-70 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Листайте</span>
        <motion.div
          className="w-px h-10 bg-[#1e4976] origin-top"
          animate={reduceMotion ? {} : { scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}

function ParallaxCloud({ cloud, scrollY, reduceMotion }) {
  const y = useTransform(scrollY, [0, 800], [0, reduceMotion ? 0 : cloud.depth])
  const { width, height, top, left, right, opacity, drift } = cloud
  return (
    <motion.div
      className="cloud"
      style={{ width, height, top, left, right, opacity, y, '--drift': drift }}
      aria-hidden="true"
    />
  )
}
