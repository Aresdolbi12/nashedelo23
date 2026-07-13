import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowIcon } from '../../src2/components/shared2.jsx'

const EASE = [0.19, 1, 0.22, 1]

/* Круглая крутящаяся печать */
function Seal() {
  return (
    <div className="seal w-32 h-32 md:w-40 md:h-40" aria-hidden="true">
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <path id="seal-circle" d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0" />
        </defs>
        <circle cx="60" cy="60" r="57" fill="none" stroke="#1d4a78" strokeWidth="3" />
        <circle cx="60" cy="60" r="33" fill="none" stroke="#1d4a78" strokeWidth="2" />
        <text fill="#1d4a78" fontSize="12.5" fontWeight="700" letterSpacing="2.5" style={{ fontFamily: 'Oswald, sans-serif', textTransform: 'uppercase' }}>
          <textPath href="#seal-circle">Участие бесплатное • места ограничены •</textPath>
        </text>
        <text x="60" y="66" textAnchor="middle" fill="#1d4a78" fontSize="19" fontWeight="700" style={{ fontFamily: 'Oswald, sans-serif' }}>
          100%
        </text>
      </svg>
    </div>
  )
}

const stampIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 1.14 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: EASE, delay },
})

export default function Hero4() {
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  // Кинетика плаката: строки заголовка разъезжаются при скролле
  const xLeft = useTransform(scrollY, [0, 700], [0, reduceMotion ? 0 : -110])
  const xRight = useTransform(scrollY, [0, 700], [0, reduceMotion ? 0 : 110])

  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden">
      {/* Наклонное окно мирного неба позади типографики */}
      <motion.div
        className="sky-window absolute -right-24 top-[16%] w-[58vw] max-w-[760px] h-[64vh] -rotate-6 border-[3px] border-[color:var(--ink)] print-shadow"
        {...stampIn(0.65)}
        aria-hidden="true"
      >
        <div className="cloud4" style={{ width: 300, height: 90, top: '18%', left: '-6%', '--drift': '70s' }} />
        <div className="cloud4" style={{ width: 240, height: 75, top: '52%', right: '-4%', '--drift': '95s' }} />
        <div className="cloud4" style={{ width: 190, height: 60, top: '74%', left: '22%', '--drift': '85s' }} />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 w-full">
        <motion.div
          className="inline-block bg-[color:var(--blue)] text-white font-poster font-medium text-sm md:text-base px-4 py-1.5 -rotate-2 mb-8"
          {...stampIn(0.1)}
        >
          Ветеранам боевых действий, участникам СВО и их семьям
        </motion.div>

        <h1 className="font-poster font-bold leading-[0.92] text-[color:var(--ink)]">
          <motion.span className="block text-[clamp(3.5rem,12vw,9.5rem)]" style={{ x: xLeft }} {...stampIn(0.25)}>
            Наше дело —
          </motion.span>
          <motion.span
            className="block text-[clamp(3.5rem,12vw,9.5rem)] text-[color:var(--blue)]"
            style={{ x: xRight }}
            {...stampIn(0.4)}
          >
            твоё дело
          </motion.span>
        </h1>

        <div className="mt-10 md:mt-14 grid md:grid-cols-[1fr_auto] gap-10 items-end max-w-4xl">
          <motion.div {...stampIn(0.6)}>
            <p className="text-lg md:text-xl leading-relaxed max-w-lg mb-9">
              Практическая программа о предпринимательстве: два дня интенсива, вебинары
              и личная дорожная карта — от идеи до устойчивого бизнеса.
            </p>
            <div className="flex flex-wrap gap-5">
              <a href="#register" className="btn-poster font-poster font-semibold text-lg px-9 py-4 inline-flex items-center gap-3">
                Записаться
                <ArrowIcon size={20} strokeWidth={3} />
              </a>
              <a href="#about" className="btn-outline4 font-poster font-medium text-lg px-9 py-4">
                Подробнее
              </a>
            </div>
          </motion.div>
          <motion.div className="hidden md:block" {...stampIn(0.85)}>
            <Seal />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
