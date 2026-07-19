import { motion } from 'framer-motion'
import { ArrowIcon } from '../../src2/components/shared2.jsx'
import { SCHEDULE } from '../content.js'
import Logo15 from './Logo15.jsx'
import Countdown18 from './Countdown18.jsx'
import orgNats from '../assets/org-natsproekty.webp'
import orgDep from '../assets/org-departament.webp'
import orgMb from '../assets/org-moibiznes.webp'
import orgFrb from '../assets/org-frb.webp'

const EASE = [0.23, 1, 0.32, 1]

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

/* Тайл с каскадным входом: короткий stagger, вход снизу с лёгким scale */
const tileVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
}

export function Tile({ className = '', children, as: As = motion.div, ...rest }) {
  return (
    <As className={`tile19 ${className}`} variants={tileVariants} {...rest}>
      {children}
    </As>
  )
}

export function TileGrid({ className = '', children, delay = 0 }) {
  return (
    <motion.div
      className={`bento19 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.045, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  )
}

/* Hero-бенто: логотип, год-призрак, countdown, организаторы, красный CTA-тайл.
   Сетка и есть композиция — сигнатурный момент варианта. */
export default function Hero19() {
  return (
    <section id="top" className="min-h-screen relative flex flex-col pt-24 pb-0">
      <div className="max-w-7xl mx-auto w-full px-4 lg:px-8 flex-1 flex flex-col justify-center pb-10">
        <TileGrid delay={0.35}>
          {/* Логотип — главный тайл */}
          <Tile className="tile19-glass col-span-12 md:col-span-7 md:row-span-2 flex flex-col items-center justify-center text-center px-6 py-12 md:py-16 min-h-[300px]">
            <div className="logo-drift11 drop-shadow-[0_18px_45px_rgba(0,0,0,0.55)]">
              <h1 className="sr-only">Наше дело</h1>
              <Logo15 size="hero" shine />
            </div>
            <p className="mt-8 text-[#f2ece3]/90 font-semibold uppercase tracking-[0.22em] text-[12px] md:text-sm leading-relaxed">
              Образовательная бизнес-программа
              <br />
              <span className="text-[10px] md:text-xs text-[#f2ece3]/65">
                для ветеранов боевых действий, участников СВО и членов их семей
              </span>
            </p>
          </Tile>

          {/* Год-призрак */}
          <Tile className="tile19-glass col-span-6 md:col-span-5 flex flex-col justify-between p-6">
            <span className="tile19-ghost text-[clamp(3rem,8vw,6rem)]">2026</span>
            <span className="text-[#d9bfa8] text-xs md:text-sm font-bold uppercase tracking-[0.2em] mt-3">
              Сентябрь — октябрь · 7 городов края
            </span>
          </Tile>

          {/* Countdown */}
          <Tile className="tile19-glass col-span-6 md:col-span-5 flex flex-col justify-center gap-3 p-6">
            <span className="text-[#d9bfa8] text-[11px] font-bold uppercase tracking-[0.2em]">
              До старта в Белореченске
            </span>
            <Countdown18 />
          </Tile>

          {/* Организаторы */}
          <Tile className="tile19-glass col-span-12 md:col-span-8 flex items-center px-6 py-5">
            <div className="grid grid-cols-2 w-full justify-items-center md:flex md:flex-wrap items-center md:justify-between gap-x-6 gap-y-4">
              {ORGS.map(({ src, alt, href }) => (
                <a key={alt} href={href} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  <img src={src} alt={alt} className="h-8 md:h-11 w-auto max-w-full object-contain" />
                </a>
              ))}
            </div>
          </Tile>

          {/* CTA — весь тайл кнопка */}
          <Tile
            as={motion.a}
            href="#register"
            className="tile19-red col-span-12 md:col-span-4 flex items-center justify-between px-7 py-6 font-black text-lg md:text-xl uppercase tracking-wide cursor-pointer"
          >
            Записаться
            <ArrowIcon size={22} />
          </Tile>
        </TileGrid>
      </div>

      {/* Лента городов */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        <CalmMarquee />
      </motion.div>
    </section>
  )
}
