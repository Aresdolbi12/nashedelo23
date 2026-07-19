import { useCallback, useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { ArrowIcon } from '../../src2/components/shared2.jsx'
import { SCHEDULE } from '../content.js'
import Logo15 from './Logo15.jsx'
import orgNats from '../assets/org-natsproekty.webp'
import orgDep from '../assets/org-departament.webp'
import orgMb from '../assets/org-moibiznes.webp'
import orgFrb from '../assets/org-frb.webp'

const EASE = [0.32, 0.72, 0, 1]

const ORGS = [
  {
    src: orgNats,
    alt: 'Национальные проекты России',
    href: 'https://xn--80aapampemcchfmo7a3c9ehj.xn--p1ai/new-projects/effektivnaya-i-konkurentnaya-ekonomika/',
  },
  {
    src: orgDep,
    alt: 'Департамент развития бизнеса и внешнеэкономической деятельности Краснодарского края',
    href: 'https://dirmsp.krasnodar.ru/',
  },
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

/* 6 копий: половина трека шире 34" ультраширокого — стык не виден */
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

/* Магнитная кнопка: тянется к курсору в радиусе своего бокса и
   пружинит обратно. На тач-устройствах — обычная кнопка. */
export function MagneticButton({ href, className, children }) {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 140, damping: 14 })
  const y = useSpring(my, { stiffness: 140, damping: 14 })

  const onMove = useCallback((e) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.28)
    my.set((e.clientY - (r.top + r.height / 2)) * 0.28)
  }, [mx, my])
  const onLeave = useCallback(() => { mx.set(0); my.set(0) }, [mx, my])

  if (reduceMotion) {
    return <a href={href} className={className}>{children}</a>
  }
  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.a>
  )
}

export default function Hero17() {
  return (
    <section id="top" className="min-h-screen relative overflow-hidden flex flex-col pt-24 pb-20">
      {/* Луч прожектора, качающийся над сценой */}
      <div className="beam17" aria-hidden="true" />

      {/* Эхо «ДЕЛО» — гигантский контур за сценой */}
      <div
        className="outline-text15 absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 text-[min(34vw,430px)] leading-none z-0"
        aria-hidden="true"
      >
        ДЕЛО
      </div>

      {/* Логотипы организаторов */}
      <motion.div
        className="relative max-w-5xl mx-auto w-full px-6 lg:px-10 mt-4 mb-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <div className="grid grid-cols-2 justify-items-center md:flex md:flex-wrap items-center justify-center gap-x-6 gap-y-4 md:gap-x-12 md:gap-y-5">
          {ORGS.map(({ src, alt, href }) => (
            <a key={alt} href={href} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <img
                src={src}
                alt={alt}
                className="h-9 md:h-14 w-auto max-w-full object-contain drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]"
              />
            </a>
          ))}
        </div>
      </motion.div>

      <div className="relative flex-1 flex flex-col justify-center z-10">
        <div className="max-w-6xl mx-auto w-full px-6 lg:px-10 text-center">
          <motion.p
            className="text-[#d9bfa8]/80 text-[12px] md:text-sm font-semibold uppercase tracking-[0.3em] mb-9"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.95 }}
          >
            Сентябрь — октябрь 2026 · Краснодарский край
          </motion.p>

          <motion.div
            className="relative inline-block"
            initial={{ opacity: 0, y: 34, scale: 0.94, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.15, ease: EASE, delay: 0.45 }}
          >
            <div className="logo-drift11 relative drop-shadow-[0_22px_55px_rgba(0,0,0,0.7)]">
              <h1 className="sr-only">Наше дело</h1>
              <Logo15 size="hero" shine />
            </div>
          </motion.div>

          <motion.p
            className="mt-10 md:mt-12 text-[#f2ece3]/90 font-semibold uppercase tracking-[0.24em] md:tracking-[0.3em] text-[13px] md:text-base leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.05 }}
          >
            Образовательная бизнес-программа
            <br />
            <span className="text-[11px] md:text-sm text-[#f2ece3]/65">
              для ветеранов боевых действий, участников СВО и членов их семей
            </span>
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 mt-11 md:mt-14"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.3 }}
          >
            <MagneticButton href="#register" className="btn-ink inline-flex items-center gap-3 px-8 py-4 font-bold">
              Записаться
              <ArrowIcon size={18} />
            </MagneticButton>
            <MagneticButton href="#about" className="btn-ghost3 inline-flex px-8 py-4 font-semibold">
              Узнать больше
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Лента городов */}
      <motion.div
        className="absolute bottom-0 inset-x-0 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <CalmMarquee />
      </motion.div>
    </section>
  )
}
