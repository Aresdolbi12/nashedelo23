import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowIcon } from '../../src2/components/shared2.jsx'
import { SCHEDULE } from '../content.js'
import logo from '../assets/logo-nashe-delo.webp'
import orgNats from '../assets/org-natsproekty.webp'
import orgDep from '../assets/org-departament.webp'
import orgMb from '../assets/org-moibiznes.webp'
import orgFrb from '../assets/org-frb.webp'

const EASE = [0.19, 1, 0.22, 1]

const ORGS = [
  { src: orgNats, alt: 'Национальные проекты России' },
  { src: orgDep, alt: 'Департамент развития бизнеса и внешнеэкономической деятельности Краснодарского края' },
  { src: orgMb, alt: 'Центр «Мой бизнес» Краснодарский край' },
  { src: orgFrb, alt: 'Фонд развития бизнеса Краснодарского края' },
]

/* Один набор городов = одна «копия» ленты. Рендерим две копии подряд:
   CSS-анимация сдвигает трек на -50%, и лента бесшовно зацикливается. */
function CityRow() {
  return (
    <span className="inline-flex shrink-0" aria-hidden="true">
      {SCHEDULE.map(({ city, dates }) => (
        <span key={city} className="inline-flex items-center gap-3 mx-7 text-sm tracking-wide text-white/85">
          <span className="w-1.5 h-1.5 rotate-45 bg-[#a8c8dc] inline-block" />
          <span className="font-semibold uppercase">{city}</span>
          <span className="text-white/50">{dates}</span>
        </span>
      ))}
    </span>
  )
}

/* Спокойная лента с постоянной скоростью (вернулись от velocity-реактивной
   версии v10: агрессивная реакция на колесо мыши мешала чтению).
   Пауза при наведении курсора — обычным CSS-селектором. */
function CalmMarquee() {
  return (
    <div className="marquee10">
      <div className="marquee11-track">
        <CityRow />
        <CityRow />
      </div>
    </div>
  )
}

export default function Hero11() {
  const reduceMotion = useReducedMotion()

  // Лёгкий параллакс свечения от курсора (декоративный слой, не текст/логотип)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 40, damping: 20 })
  const sy = useSpring(my, { stiffness: 40, damping: 20 })
  const glowX = useTransform(sx, [-1, 1], [22, -22])
  const glowY = useTransform(sy, [-1, 1], [14, -14])

  const onMove = (e) => {
    if (reduceMotion) return
    mx.set((e.clientX / window.innerWidth) * 2 - 1)
    my.set((e.clientY / window.innerHeight) * 2 - 1)
  }

  return (
    <section
      id="top"
      className="min-h-screen relative overflow-hidden flex flex-col pt-24 pb-20"
      onMouseMove={onMove}
    >
      {/* Тихое дышащее свечение восхода за логотипом */}
      <motion.div
        className="absolute left-1/2 top-[46%] pointer-events-none"
        style={{ x: glowX, y: glowY }}
        aria-hidden="true"
      >
        <div className="sun-glow9" />
      </motion.div>

      {/* Логотипы организаторов — под меню */}
      <motion.div
        className="relative max-w-5xl mx-auto w-full px-6 lg:px-10 mt-4 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.1 }}
      >
        {/* На телефоне — сетка 2×2 (компактно), на десктопе — один ряд */}
        <div className="grid grid-cols-2 justify-items-center md:flex md:flex-wrap items-center justify-center gap-x-6 gap-y-4 md:gap-x-12 md:gap-y-5">
          {ORGS.map(({ src, alt }) => (
            <img
              key={alt}
              src={src}
              alt={alt}
              className="h-9 md:h-16 w-auto max-w-full object-contain drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]"
            />
          ))}
        </div>
      </motion.div>

      <div className="relative flex-1 flex flex-col justify-center">
        {/* Логотип: спокойное появление + пробегающий металлический блик (из варианта 8) */}
        <div className="max-w-6xl mx-auto w-full px-6 lg:px-10 text-center">
          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0, y: 30, scale: 0.94, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: EASE, delay: 0.55 }}
          >
            <div className="logo-drift11 relative">
              <img
                src={logo}
                alt="Наше дело"
                className="mx-auto w-[min(80vw,520px)] h-auto drop-shadow-[0_18px_45px_rgba(0,0,0,0.55)]"
              />
              <div
                className="logo-glint11"
                style={{ WebkitMaskImage: `url(${logo})`, maskImage: `url(${logo})` }}
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </div>

        {/* Строгая типографская строка */}
        <motion.div
          className="flex items-center justify-center gap-4 md:gap-6 px-6 mt-10 md:mt-14"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.0 }}
        >
          <span className="hidden sm:block h-px w-10 md:w-16 bg-white/25 shrink-0" aria-hidden="true" />
          <p className="text-white/80 text-[13px] md:text-base font-semibold uppercase tracking-[0.24em] md:tracking-[0.3em] text-center leading-relaxed max-w-3xl">
            Образовательная бизнес-программа
            <span className="text-white/30 mx-2 md:mx-3">·</span>
            для участников боевых действий, ветеранов СВО и членов их семей
          </p>
          <span className="hidden sm:block h-px w-10 md:w-16 bg-white/25 shrink-0" aria-hidden="true" />
        </motion.div>

        <div className="text-center mt-10 md:mt-14">
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.3 }}
          >
            <a href="#register" className="btn-light inline-flex items-center gap-3 px-8 py-4 font-bold">
              Записаться
              <ArrowIcon size={18} />
            </a>
            <a href="#about" className="btn-ghost3 px-8 py-4 font-semibold">
              Узнать больше
            </a>
          </motion.div>

          {/* Стеклянная кнопка-стрелка вниз */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 1 }}
          >
            <a
              href="#about"
              aria-label="К описанию программы"
              className="inline-flex w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur items-center justify-center text-white/85 hover:bg-white/20 hover:border-white/50 transition"
            >
              <motion.svg
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                animate={reduceMotion ? {} : { y: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </motion.svg>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Лента городов и дат: спокойный постоянный ход */}
      <motion.div
        className="absolute bottom-0 inset-x-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.7 }}
      >
        <CalmMarquee />
      </motion.div>
    </section>
  )
}
