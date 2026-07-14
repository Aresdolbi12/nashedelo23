import { motion } from 'framer-motion'
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

export default function Hero5() {
  return (
    <section id="top" className="min-h-screen flex flex-col relative px-0 pt-24 pb-0">
      {/* Логотипы организаторов — под меню */}
      <motion.div
        className="max-w-5xl mx-auto w-full px-6 lg:px-10 mt-4 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
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

      <div className="flex-1 flex items-center">
        <div className="max-w-6xl mx-auto w-full px-6 lg:px-10 text-center">
          {/* Логотип вместо заголовка */}
          <motion.img
            src={logo}
            alt="Наше дело"
            className="mx-auto w-[min(82vw,540px)] h-auto drop-shadow-[0_18px_45px_rgba(0,0,0,0.55)]"
            initial={{ opacity: 0, y: 34, scale: 0.94, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, ease: EASE, delay: 1.15 }}
          />

          {/* Выезжающие полоски: металл + стекло */}
          <div className="mt-9 mb-10 flex flex-col items-center gap-3">
            <motion.div
              className="ribbon-metal px-6 md:px-9 py-2.5 text-[#101820] font-extrabold tracking-[0.14em] text-sm md:text-lg uppercase"
              initial={{ opacity: 0, x: -90 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, ease: EASE, delay: 1.65 }}
            >
              Образовательная бизнес-программа
            </motion.div>
            <motion.div
              className="ribbon-glass px-6 md:px-9 py-2.5 text-white/95 font-semibold tracking-[0.1em] text-[11px] md:text-sm uppercase"
              initial={{ opacity: 0, x: 90 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, ease: EASE, delay: 1.85 }}
            >
              Для ветеранов боевых действий, участников СВО и&nbsp;членов их&nbsp;семей
            </motion.div>
          </div>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 2 }}
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
            className="mt-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            <a
              href="#about"
              aria-label="К описанию программы"
              className="inline-flex w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur items-center justify-center text-white/85 hover:bg-white/20 hover:border-white/50 transition"
            >
              <motion.svg
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </motion.svg>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Лента городов и дат (из варианта 2, в стекле рассвета) */}
      <motion.div
        className="marquee5 py-3.5 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        aria-hidden="true"
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
    </section>
  )
}
