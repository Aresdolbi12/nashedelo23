import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowIcon, Counter, EASE } from './shared2.jsx'
import { SCHEDULE } from '../content.js'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.6 } },
}

const item = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: EASE } },
}

/* Чертёж, который рисует себя: фундамент → стены → крыша → флаг */
function BlueprintDrawing({ reduceMotion }) {
  const stroke = 'var(--steel)'
  const draw = (delay, dur = 1.1) =>
    reduceMotion
      ? {}
      : {
          initial: { pathLength: 0 },
          animate: { pathLength: 1 },
          transition: { duration: dur, ease: 'easeInOut', delay },
        }

  return (
    <svg viewBox="0 0 420 420" fill="none" className="w-full h-auto" aria-hidden="true">
      {/* оси */}
      <motion.line x1="30" y1="390" x2="410" y2="390" stroke={stroke} strokeWidth="1.5" {...draw(0.8, 0.8)} />
      <motion.line x1="30" y1="390" x2="30" y2="20" stroke={stroke} strokeWidth="1.5" {...draw(1, 0.8)} />
      {/* фундамент */}
      <motion.rect x="80" y="340" width="260" height="34" stroke={stroke} strokeWidth="2" {...draw(1.6)} />
      {/* стены */}
      <motion.path d="M104 340 V 210 H 316 V 340" stroke={stroke} strokeWidth="2" {...draw(2.4)} />
      {/* крыша */}
      <motion.path d="M88 210 L 210 118 L 332 210" stroke={stroke} strokeWidth="2" {...draw(3.3)} />
      {/* дверь и окно */}
      <motion.rect x="186" y="272" width="48" height="68" stroke={stroke} strokeWidth="1.5" {...draw(4)} strokeDasharray="4 4" />
      <motion.rect x="252" y="240" width="40" height="34" stroke={stroke} strokeWidth="1.5" {...draw(4.2)} strokeDasharray="4 4" />
      {/* флаг на крыше */}
      <motion.line x1="210" y1="118" x2="210" y2="66" stroke={stroke} strokeWidth="2" {...draw(4.6, 0.5)} />
      <motion.path d="M210 66 H 258 L 244 80 L 258 94 H 210" stroke={stroke} strokeWidth="2" fill="none" {...draw(5, 0.7)} />
      {/* размерная линия под фундаментом */}
      <motion.line x1="80" y1="408" x2="340" y2="408" stroke={stroke} strokeWidth="1" {...draw(5.6, 0.7)} />
      <line x1="80" y1="402" x2="80" y2="414" stroke={stroke} strokeWidth="1" />
      <line x1="340" y1="402" x2="340" y2="414" stroke={stroke} strokeWidth="1" />
      <motion.text
        x="210" y="404" textAnchor="middle"
        className="font-display"
        fill={stroke} fontSize="11" letterSpacing="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduceMotion ? 0 : 6, duration: 0.6 }}
      >
        ВАШЕ ДЕЛО
      </motion.text>
    </svg>
  )
}

const STATS = [
  { value: 2, label: 'дня интенсива' },
  { value: 9, label: 'экспертов' },
  { value: 7, label: 'городов края' },
  { value: 100, suffix: '%', label: 'бесплатно' },
]

export default function Hero2() {
  const reduceMotion = useReducedMotion()
  const glareRef = useRef(null)

  // Световое пятно «лампы над кульманом», следующее за курсором
  const onMouseMove = (e) => {
    if (reduceMotion || !glareRef.current) return
    glareRef.current.style.background = `radial-gradient(420px circle at ${e.clientX}px ${e.clientY}px, rgba(255,255,255,0.55), transparent 70%)`
  }

  return (
    <section id="top" className="blueprint min-h-screen flex items-center pt-28 pb-0 relative" onMouseMove={onMouseMove}>
      <div ref={glareRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <motion.div className="lg:col-span-7" variants={container} initial="hidden" animate="visible">
            <motion.div variants={item} className="stamp mb-8">
              <span className="stamp-num">лист 1</span>
              <span className="stamp-name">Образовательная программа · ТПП Краснодарского края</span>
            </motion.div>

            <h1 className="font-display font-black text-[clamp(2.5rem,6vw,5.5rem)] leading-[1] text-[color:var(--ink)] mb-7">
              <motion.span variants={item} className="block">Чертёж</motion.span>
              <motion.span variants={item} className="block">
                вашего <span className="text-outline">дела</span>
              </motion.span>
            </h1>

            <motion.p variants={item} className="text-lg md:text-xl text-[#31435c] max-w-xl leading-relaxed mb-10">
              «Наше дело» — практическая программа для ветеранов боевых действий, участников СВО
              и их семей. Два дня интенсива, вебинары и личная дорожная карта: от идеи до
              устойчивого бизнеса.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4 items-center">
              <a
                href="#register"
                className="btn-steel sheen chamfer px-8 py-4 text-sm font-bold tracking-wider uppercase inline-flex items-center gap-3"
              >
                Записаться на программу
                <ArrowIcon />
              </a>
              <a href="#about" className="btn-paper chamfer px-8 py-4 text-sm font-semibold tracking-wide uppercase">
                Узнать больше
              </a>
            </motion.div>

            <motion.div variants={item} className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px bg-[color:var(--line)] border border-[color:var(--line)] max-w-2xl">
              {STATS.map(({ value, suffix, label }) => (
                <div key={label} className="bg-[color:var(--paper)] px-4 py-4">
                  <div className="font-display font-black text-3xl text-[color:var(--ink)]">
                    <Counter value={value} suffix={suffix} />
                  </div>
                  <div className="text-xs text-gray-600 mt-1">{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="hidden lg:block lg:col-span-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            <BlueprintDrawing reduceMotion={reduceMotion} />
          </motion.div>
        </div>
      </div>

      {/* Бегущая строка городов по нижней кромке */}
      <div className="absolute bottom-0 left-0 right-0 steel-band text-white/85 py-3 marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <span key={copy} className="inline-flex">
              {SCHEDULE.map(({ city, dates }) => (
                <span key={city + copy} className="inline-flex items-center gap-3 mx-6 text-sm tracking-wide">
                  <span className="w-1.5 h-1.5 rotate-45 bg-[color:var(--sky)] inline-block" />
                  <span className="font-semibold uppercase">{city}</span>
                  <span className="text-white/50">{dates}</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
