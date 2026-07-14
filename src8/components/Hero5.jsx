import { useCallback } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowIcon } from '../../src2/components/shared2.jsx'
import { SCHEDULE } from '../../src2/content.js'
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

/* Пылинки в рассветном свете: детерминированный набор, анимация в CSS */
const DUST = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 61 + 13) % 100,
  size: 2 + ((i * 7) % 3),
  delay: (i * 1.7) % 12,
  dur: 11 + ((i * 3) % 9),
  drift: (i % 2 ? 1 : -1) * (18 + ((i * 5) % 26)),
}))

/* Диагональная полоса-конвейер: текст бежит по ней без остановки.
   Две одинаковые копии контента + translateX(-50%) = бесшовный цикл. */
function MarqueeStripe({ text, className, trackClass = '', rotate, reverse, delay, reduceMotion }) {
  return (
    <motion.div
      className={`relative left-1/2 -ml-[57.5vw] w-[115vw] overflow-hidden ${className}`}
      initial={reduceMotion ? { rotate } : { opacity: 0, y: 26, rotate }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      <div className={`stripe8-track ${reverse ? 'stripe8-rev' : ''} ${trackClass}`}>
        {[0, 1].map((copy) => (
          <span key={copy} className="inline-flex shrink-0" aria-hidden={copy === 1 || undefined}>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="inline-flex items-center whitespace-nowrap">
                <span className="px-8">{text}</span>
                <span className="stripe8-sep" aria-hidden="true">◆</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Hero5() {
  const reduceMotion = useReducedMotion()

  // Параллакс от курсора: логотип подаётся к курсору и наклоняется,
  // свечение солнца уходит в противофазе — ощущение глубины сцены
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 55, damping: 16 })
  const sy = useSpring(my, { stiffness: 55, damping: 16 })
  const logoX = useTransform(sx, [-1, 1], [-16, 16])
  const logoY = useTransform(sy, [-1, 1], [-10, 10])
  const rotY = useTransform(sx, [-1, 1], [-5, 5])
  const rotX = useTransform(sy, [-1, 1], [4, -4])
  const glowX = useTransform(sx, [-1, 1], [26, -26])
  const glowY = useTransform(sy, [-1, 1], [18, -18])

  const onMove = useCallback(
    (e) => {
      if (reduceMotion) return
      mx.set((e.clientX / window.innerWidth) * 2 - 1)
      my.set((e.clientY / window.innerHeight) * 2 - 1)
    },
    [mx, my, reduceMotion],
  )

  return (
    <section
      id="top"
      className="min-h-screen relative overflow-hidden flex flex-col pt-24 pb-20"
      onMouseMove={onMove}
    >
      {/* Слой рассвета: дышащее свечение + медленно вращающиеся лучи */}
      <motion.div
        className="absolute left-1/2 top-[46%] pointer-events-none"
        style={{ x: glowX, y: glowY }}
        aria-hidden="true"
      >
        <div className="sun-rays8" />
        <div className="sun-glow8" />
      </motion.div>

      {/* Пылинки в свете */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {DUST.map(({ left, size, delay, dur, drift }, i) => (
          <span
            key={i}
            className="dust8"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              animationDelay: `${delay}s`,
              animationDuration: `${dur}s`,
              '--drift': `${drift}px`,
            }}
          />
        ))}
      </div>

      {/* Логотипы организаторов — под меню */}
      <motion.div
        className="relative max-w-5xl mx-auto w-full px-6 lg:px-10 mt-4 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.1 }}
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

      <div className="relative flex-1 flex flex-col justify-center">
        {/* Логотип: 3D-наклон за курсором + пробегающий блик металла */}
        <div className="max-w-6xl mx-auto w-full px-6 lg:px-10 text-center" style={{ perspective: 900 }}>
          <motion.div
            className="relative inline-block"
            style={reduceMotion ? undefined : { x: logoX, y: logoY, rotateX: rotX, rotateY: rotY }}
            initial={{ opacity: 0, y: 30, scale: 0.94, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: EASE, delay: 0.55 }}
          >
            <img
              src={logo}
              alt="Наше дело"
              className="mx-auto w-[min(74vw,470px)] h-auto drop-shadow-[0_18px_45px_rgba(0,0,0,0.55)]"
            />
            <div
              className="logo-glint8"
              style={{ WebkitMaskImage: `url(${logo})`, maskImage: `url(${logo})` }}
              aria-hidden="true"
            />
          </motion.div>
        </div>

        {/* Две диагональные полосы-конвейера: текст едет по ним без остановки */}
        <div className="relative mt-12 md:mt-16">
          <MarqueeStripe
            text="Образовательная бизнес-программа"
            className="stripe-metal z-10 py-4 md:py-6 text-[#101820] font-extrabold uppercase tracking-[0.16em] text-sm md:text-2xl"
            rotate={-2.2}
            delay={1.0}
            reduceMotion={reduceMotion}
          />
          <MarqueeStripe
            text="Для ветеранов боевых действий, участников СВО и членов их семей"
            className="stripe-steel -mt-1 py-3 md:py-4 text-white/95 font-semibold uppercase tracking-[0.12em] text-[10px] md:text-base"
            trackClass="stripe8-slow"
            rotate={1.6}
            reverse
            delay={1.2}
            reduceMotion={reduceMotion}
          />
        </div>

        <div className="text-center mt-12 md:mt-16">
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.5 }}
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
            transition={{ delay: 2, duration: 1 }}
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

      {/* Лента городов и дат — ровно по нижней кромке экрана */}
      <motion.div
        className="marquee5 absolute bottom-0 inset-x-0 py-3.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
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
