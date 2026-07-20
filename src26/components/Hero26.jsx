import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowIcon } from '../../src2/components/shared2.jsx'
import { SCHEDULE } from '../content.js'
import LogoFx25 from './LogoFx25.jsx'
import Star22 from './Star22.jsx'
import orgNats from '../assets/org-natsproekty.webp'
import orgDep from '../assets/org-departament.webp'
import orgMb from '../assets/org-moibiznes.webp'
import orgFrb from '../assets/org-frb.webp'

const EASE = [0.19, 1, 0.22, 1]

const ORGS = [
  { src: orgNats, alt: 'Национальные проекты России', href: 'https://xn--80aapampemcchfmo7a3c9ehj.xn--p1ai/new-projects/effektivnaya-i-konkurentnaya-ekonomika/' },
  { src: orgDep, alt: 'Департамент развития бизнеса и внешнеэкономической деятельности Краснодарского края', href: 'https://dirmsp.krasnodar.ru/' },
  { src: orgMb, alt: 'Центр «Мой бизнес» Краснодарский край', href: 'https://moibiz93.ru/' },
  { src: orgFrb, alt: 'Фонд развития бизнеса Краснодарского края', href: 'https://moibiz93.ru/' },
]

function CityRow() {
  return (
    <span className="inline-flex shrink-0" aria-hidden="true">
      {SCHEDULE.map(({ city, dates }) => (
        <span key={city} className="inline-flex items-center gap-3 mx-7 text-sm tracking-wide text-white/95">
          <span className="w-1.5 h-1.5 rotate-45 bg-white/80 inline-block" />
          <span className="font-semibold uppercase">{city}</span>
          <span className="text-white/65">{dates}</span>
        </span>
      ))}
    </span>
  )
}

function CalmMarquee() {
  return (
    <div className="marquee10">
      <div className="marquee11-track">
        <CityRow /><CityRow /><CityRow />
        <CityRow /><CityRow /><CityRow />
      </div>
    </div>
  )
}

function SceneContent({ logoStyle, fadeStyle }) {
  return (
    <>
      <Star22 draw />
      <motion.div
        className="relative max-w-5xl mx-auto w-full px-6 lg:px-10 mt-4 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.1 }}
        style={fadeStyle}
      >
        <div className="grid grid-cols-2 justify-items-center md:flex md:flex-wrap items-center justify-center gap-x-6 gap-y-4 md:gap-x-12 md:gap-y-5">
          {ORGS.map(({ src, alt, href }) => (
            <a key={alt} href={href} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <img src={src} alt={alt} className="h-9 md:h-16 w-auto max-w-full object-contain drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]" />
            </a>
          ))}
        </div>
      </motion.div>

      <div className="relative flex-1 flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full px-6 lg:px-10 text-center">
          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            style={logoStyle}
          >
            <div className="logo-drift11 relative drop-shadow-[0_18px_45px_rgba(0,0,0,0.55)]">
              <h1 className="sr-only">Наше дело</h1>
              <LogoFx25 />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="flex items-center justify-center gap-4 md:gap-6 px-6 mt-10 md:mt-14"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.0 }}
          style={fadeStyle}
        >
          <span className="hidden sm:block h-px w-10 md:w-16 bg-[#d9bfa8]/40 shrink-0" aria-hidden="true" />
          <p className="text-[#f2ece3]/90 text-[13px] md:text-base font-semibold uppercase tracking-[0.24em] md:tracking-[0.3em] text-center leading-relaxed max-w-4xl">
            Образовательная бизнес-программа
            <br />
            <span className="text-[11px] md:text-sm text-[#f2ece3]/70">
              для ветеранов боевых действий, участников СВО и членов их семей
            </span>
          </p>
          <span className="hidden sm:block h-px w-10 md:w-16 bg-[#d9bfa8]/40 shrink-0" aria-hidden="true" />
        </motion.div>

        <motion.div
          className="text-center mt-10 md:mt-14"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.3 }}
          style={fadeStyle}
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#register" className="btn-light inline-flex items-center gap-3 px-8 py-4 font-bold">
              Записаться
              <ArrowIcon size={18} />
            </a>
            <a href="#about" className="btn-ghost3 px-8 py-4 font-semibold">
              Узнать больше
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-0 inset-x-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.7 }}
      >
        <CalmMarquee />
      </motion.div>
    </>
  )
}

/* Hero26 «Кино»: единственная пин-сцена страницы (правило: не больше 1-2 пинов).
   Логотип гравируется лучом, затем на скролле камера «отъезжает»: логотип
   сжимается, титры-подписи растворяются, сверху и снизу сходятся летербокс-
   шторки. Дальше страница листается как последовательность кадров. */
export default function Hero26() {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.6])
  const y = useTransform(scrollYProgress, [0, 0.8], [0, -50])
  const fade = useTransform(scrollYProgress, [0.1, 0.55], [1, 0])
  const barH = useTransform(scrollYProgress, [0.12, 0.85], ['0vh', '12vh'])
  const dim = useTransform(scrollYProgress, [0.75, 1], [1, 0.4])

  if (reduceMotion) {
    return (
      <section id="top" className="min-h-screen relative overflow-hidden flex flex-col pt-24 pb-20">
        <SceneContent />
      </section>
    )
  }

  return (
    <section id="top" ref={ref} className="relative h-[240vh]">
      <motion.div
        className="sticky top-0 h-screen overflow-hidden flex flex-col pt-24 pb-20"
        style={{ opacity: dim }}
      >
        {/* Летербокс: кино-шторки, сходящиеся при отъезде камеры */}
        <motion.div className="absolute top-0 inset-x-0 bg-[#04120c] z-20" style={{ height: barH }} aria-hidden="true" />
        <motion.div className="absolute bottom-0 inset-x-0 bg-[#04120c] z-20" style={{ height: barH }} aria-hidden="true" />
        {/* Маркер кадра */}
        <span className="cadre26 absolute top-24 left-6 md:left-10 z-10" aria-hidden="true">кадр 01 — наше дело</span>
        <SceneContent logoStyle={{ scale, y }} fadeStyle={{ opacity: fade }} />
      </motion.div>
    </section>
  )
}
