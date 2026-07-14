import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowIcon } from '../../src2/components/shared2.jsx'
import { SCHEDULE } from '../../src2/content.js'
import logo from '../assets/logo-nashe-delo.png'
import orgNats from '../assets/org-natsproekty.png'
import orgDep from '../assets/org-departament.png'
import orgMb from '../assets/org-moibiznes.png'
import orgFrb from '../assets/org-frb.png'

const EASE = [0.19, 1, 0.22, 1]

const ORGS = [
  { src: orgNats, alt: 'Национальные проекты России' },
  { src: orgDep, alt: 'Департамент развития бизнеса и внешнеэкономической деятельности Краснодарского края' },
  { src: orgMb, alt: 'Центр «Мой бизнес» Краснодарский край' },
  { src: orgFrb, alt: 'Фонд развития бизнеса Краснодарского края' },
]

/* Рассвет, рисующий себя за логотипом: горизонт → солнце → лучи → птицы.
   Лучи после отрисовки мягко пульсируют по кругу — «залипательный» хук. */
function SunriseArt({ reduceMotion }) {
  const draw = (delay, dur = 1) =>
    reduceMotion
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: {
            pathLength: { duration: dur, ease: 'easeInOut', delay },
            opacity: { duration: 0.3, delay },
          },
        }

  const rays = [
    'M300 96 V 44', 'M225 118 L 193 76', 'M375 118 L 407 76',
    'M168 178 L 116 152', 'M432 178 L 484 152', 'M138 246 L 84 238', 'M462 246 L 516 238',
  ]

  return (
    <svg
      viewBox="0 0 600 300"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[58%] w-[min(92vw,680px)] h-auto pointer-events-none"
      aria-hidden="true"
    >
      <g stroke="rgba(255,255,255,0.35)" strokeWidth="2" fill="none" strokeLinecap="round">
        {/* горизонт */}
        <motion.line x1="30" y1="264" x2="570" y2="264" {...draw(1.1, 1.3)} />
        {/* восходящее солнце */}
        <motion.path d="M186 264 A 114 114 0 0 1 414 264" stroke="rgba(255,235,190,0.55)" strokeWidth="2.5" {...draw(2.2, 1.5)} />
        {/* лучи: рисуются по очереди, затем пульсируют */}
        {rays.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            stroke="rgba(255,235,190,0.45)"
            initial={reduceMotion ? {} : { pathLength: 0, opacity: 0 }}
            animate={
              reduceMotion
                ? {}
                : { pathLength: 1, opacity: [0, 1, 0.35, 1] }
            }
            transition={
              reduceMotion
                ? {}
                : {
                    pathLength: { duration: 0.5, ease: 'easeOut', delay: 3.6 + i * 0.18 },
                    opacity: {
                      delay: 3.6 + i * 0.18,
                      duration: 6,
                      repeat: Infinity,
                      repeatDelay: 1.5,
                      ease: 'easeInOut',
                    },
                  }
            }
          />
        ))}
        {/* птицы */}
        <motion.path d="M84 96 Q 96 84 108 96 Q 120 84 132 96" {...draw(5, 0.9)} />
        <motion.path d="M468 66 Q 478 56 488 66 Q 498 56 508 66" {...draw(5.4, 0.9)} />
      </g>
    </svg>
  )
}

/* Широкая диагональная полоса на всю ширину экрана; текст едет вместе с ней */
function Stripe({ children, className, rotate, fromLeft = true, delay }) {
  return (
    <div className="relative left-1/2 -ml-[50vw] w-screen overflow-hidden py-3">
      <motion.div
        className={`w-[108vw] -ml-[4vw] text-center px-8 ${className}`}
        initial={{ x: fromLeft ? '-108%' : '108%', rotate }}
        animate={{ x: 0, rotate }}
        transition={{ duration: 1.2, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default function Hero5() {
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()

  // Первый скролл = переход слайда: hero уезжает вверх, тает и слегка сжимается
  const slideY = useTransform(scrollY, [0, 620], [0, reduceMotion ? 0 : -110])
  const slideOpacity = useTransform(scrollY, [0, 560], [1, reduceMotion ? 1 : 0])
  const slideScale = useTransform(scrollY, [0, 620], [1, reduceMotion ? 1 : 0.95])

  return (
    <section id="top" className="min-h-screen relative overflow-hidden flex flex-col pt-24 pb-20">
      <motion.div
        className="flex-1 flex flex-col"
        style={{ y: slideY, opacity: slideOpacity, scale: slideScale }}
      >
        {/* Логотипы организаторов — под меню */}
        <motion.div
          className="max-w-5xl mx-auto w-full px-6 lg:px-10 mt-4 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
            {ORGS.map(({ src, alt }) => (
              <img
                key={alt}
                src={src}
                alt={alt}
                className="h-12 md:h-16 w-auto drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]"
              />
            ))}
          </div>
        </motion.div>

        <div className="flex-1 flex flex-col justify-center">
          {/* Логотип поверх рисующегося рассвета */}
          <div className="relative max-w-6xl mx-auto w-full px-6 lg:px-10 text-center">
            <SunriseArt reduceMotion={reduceMotion} />
            <motion.img
              src={logo}
              alt="Наше дело"
              className="relative mx-auto w-[min(74vw,470px)] h-auto drop-shadow-[0_18px_45px_rgba(0,0,0,0.55)]"
              initial={{ opacity: 0, y: 34, scale: 0.94, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, ease: EASE, delay: 1.15 }}
            />
          </div>

          {/* Две широкие диагональные полосы */}
          <div className="mt-12 md:mt-14 space-y-0">
            <Stripe
              className="stripe-metal py-3.5 md:py-5 text-[#101820] font-extrabold uppercase tracking-[0.16em] text-sm md:text-2xl"
              rotate={-2}
              fromLeft
              delay={1.7}
            >
              Образовательная бизнес-программа
            </Stripe>
            <Stripe
              className="stripe-steel py-3 md:py-4 text-white/95 font-semibold uppercase tracking-[0.12em] text-[10px] md:text-base -mt-1"
              rotate={1.4}
              fromLeft={false}
              delay={1.95}
            >
              Для ветеранов боевых действий, участников СВО и&nbsp;членов их&nbsp;семей
            </Stripe>
          </div>

          <div className="text-center mt-10 md:mt-12">
            <motion.div
              className="flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 2.3 }}
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
              transition={{ delay: 2.8, duration: 1 }}
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
      </motion.div>

      {/* Лента городов и дат — ровно по нижней кромке экрана */}
      <motion.div className="absolute bottom-0 inset-x-0" style={{ opacity: slideOpacity }} aria-hidden="true">
        <motion.div
          className="marquee5 py-3.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.4 }}
        >
        <div className="marquee5-track">
          {[0, 1].map((copy) => (
            <span key={copy} className="inline-flex">
              {SCHEDULE.map(({ city, dates }) => (
                <span key={city + copy} className="inline-flex items-center gap-3 mx-6 text-sm tracking-wide text-white/85">
                  <span className="w-1.5 h-1.5 rotate-45 bg-[#a8c8dc] inline-block" />
                  <span className="font-semibold uppercase">{city}</span>
                  <span className="text-white/50">{dates}</span>
                </span>
              ))}
            </span>
          ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
