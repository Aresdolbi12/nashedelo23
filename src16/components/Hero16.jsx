import { motion } from 'framer-motion'
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

/* 6 копий (3 на половину): половина трека шире 34"-ультраширокого,
   стык -50% никогда не виден */
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

/* Строка, выезжающая из невидимого бокса (маск-reveal) */
function MaskLine({ children, delay = 0, className = '' }) {
  return (
    <span className={`mask16 ${className}`}>
      <motion.span
        className="block"
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

/* Кнопка-пилюля со вложенной иконкой-«островом» */
export function IslandButton({ href, children, kind = 'red', className = '' }) {
  return (
    <a href={href} className={`btn16 btn16-${kind} ${className}`}>
      {children}
      <span className="btn16-icon" aria-hidden="true">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </a>
  )
}

/* Hero: тёмно-зелёная сцена на светлой странице (bold blocking).
   Логотип-серебро в центре, маск-reveal подписи, кнопки-острова,
   лента городов по нижней кромке. Скруглённый низ отделяет полосу от бумаги. */
export default function Hero16() {
  return (
    <section
      id="top"
      className="min-h-screen relative overflow-hidden flex flex-col pt-24 pb-24 bg-[#154734] rounded-b-[2.5rem]"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at 50% -20%, rgba(217,191,168,0.16) 0%, transparent 55%), linear-gradient(180deg, #0d2f22 0%, #154734 35%, #133f2e 100%)',
      }}
    >
      {/* Контурный год у правого края полосы */}
      <div
        className="outline-text15 absolute right-[-2vw] top-[14%] text-[min(20vw,240px)] z-0"
        aria-hidden="true"
      >
        2026
      </div>

      {/* Логотипы организаторов */}
      <motion.div
        className="relative max-w-5xl mx-auto w-full px-6 lg:px-10 mt-2 mb-2"
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
                className="h-9 md:h-14 w-auto max-w-full object-contain drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]"
              />
            </a>
          ))}
        </div>
      </motion.div>

      <div className="relative flex-1 flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full px-6 lg:px-10 text-center">
          <motion.div
            className="inline-flex mb-8"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
          >
            <span className="eyebrow16 eyebrow16-invert">Сентябрь — октябрь 2026 · Краснодарский край</span>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 26, scale: 0.96, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: EASE, delay: 0.45 }}
          >
            <div className="logo-drift11 inline-block drop-shadow-[0_18px_45px_rgba(0,0,0,0.55)]">
              <h1 className="sr-only">Наше дело</h1>
              <Logo15 size="hero" shine />
            </div>
          </motion.div>

          {/* Подпись — построчный маск-reveal */}
          <p className="mt-10 md:mt-12 text-[#f2ece3]/90 font-semibold uppercase tracking-[0.24em] md:tracking-[0.3em] text-[13px] md:text-base leading-relaxed">
            <MaskLine delay={1.0}>Образовательная бизнес-программа</MaskLine>
            <MaskLine delay={1.12} className="text-[11px] md:text-sm text-[#f2ece3]/65 mt-1">
              для ветеранов боевых действий, участников СВО и членов их семей
            </MaskLine>
          </p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 mt-11 md:mt-14"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.35 }}
          >
            <IslandButton href="#register" kind="red">Записаться</IslandButton>
            <IslandButton href="#about" kind="ghost-dark">Узнать больше</IslandButton>
          </motion.div>
        </div>
      </div>

      {/* Лента городов по нижней кромке зелёной полосы */}
      <motion.div
        className="absolute bottom-0 inset-x-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
      >
        <CalmMarquee />
      </motion.div>
    </section>
  )
}
