import { motion } from 'framer-motion'
import { SCHEDULE } from '../content.js'
import Logo15 from './Logo15.jsx'
import Countdown18 from './Countdown18.jsx'
import orgNats from '../assets/org-natsproekty.webp'
import orgDep from '../assets/org-departament.webp'
import orgMb from '../assets/org-moibiznes.webp'
import orgFrb from '../assets/org-frb.webp'

const EASE = [0.16, 1, 0.3, 1]

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

/* 6 копий — половина трека шире 34" ультраширокого, стык не виден */
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

export function IslandButton({ href, children, kind = 'red', className = '' }) {
  return (
    <a href={href} className={`btn16 btn16-${kind} ${className}`}>
      {children}
      <span className="btn16-icon" aria-hidden="true">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </a>
  )
}

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
})

/* Hero-афиша: бумага, монументальный чернильный логотип edge-to-edge,
   красная плашка дат, штамп «бесплатно», честный countdown.
   Минимум движения — плакат работает графикой (урок Росмолодёжи). */
export default function Hero18() {
  return (
    <section id="top" className="min-h-screen relative overflow-hidden flex flex-col pt-28 pb-16">
      <div className="max-w-6xl mx-auto w-full px-5 lg:px-10 flex-1 flex flex-col">
        {/* Полоса организаторов: белые лого на зелёной плашке */}
        <motion.div {...reveal(0.9)} className="block18 block18-green px-5 py-4 md:px-8">
          <div className="grid grid-cols-2 justify-items-center md:flex md:flex-wrap items-center justify-between gap-x-6 gap-y-4">
            {ORGS.map(({ src, alt, href }) => (
              <a key={alt} href={href} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img src={src} alt={alt} className="h-8 md:h-12 w-auto max-w-full object-contain" />
              </a>
            ))}
          </div>
        </motion.div>

        <div className="flex-1 flex flex-col justify-center py-10 md:py-14">
          {/* Монумент: логотип + плашка дат со штампом */}
          <div className="relative text-center">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            >
              <h1 className="sr-only">Наше дело</h1>
              <Logo15 size="poster" tone="ink" />
            </motion.div>

            <motion.div
              {...reveal(0.5)}
              className="relative z-10 mx-auto -mt-4 md:-mt-7 w-fit"
            >
              <div className="block18 block18-red px-6 py-3 md:px-9 md:py-4 rotate-[-1.2deg]">
                <div className="font-black uppercase tracking-[0.14em] text-sm md:text-xl">
                  16.09 — 30.10.2026 · 7 городов края
                </div>
              </div>
              <span className="stamp18 absolute -right-6 md:-right-24 -top-5 bg-[#faf5eb] text-xs md:text-sm">
                Бесплатно
              </span>
            </motion.div>
          </div>

          {/* Подпись-афиша с ручными переносами */}
          <motion.p
            {...reveal(0.65)}
            className="display18 text-center text-[#27251f] mt-10 md:mt-14 text-[clamp(1.15rem,3.4vw,2.4rem)]"
          >
            Образовательная
            <br />
            бизнес-программа
          </motion.p>
          <motion.p
            {...reveal(0.75)}
            className="text-center text-[#623b2a] font-bold uppercase tracking-[0.16em] text-[11px] md:text-sm mt-4 max-w-3xl mx-auto leading-relaxed"
          >
            для ветеранов боевых действий, участников СВО и членов их семей
          </motion.p>

          {/* Countdown + CTA */}
          <motion.div
            {...reveal(0.9)}
            className="mt-10 md:mt-14 flex flex-col md:flex-row items-center justify-center gap-7 md:gap-12"
          >
            <div className="text-center md:text-right">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#623b2a] mb-3">
                До старта в Белореченске
              </div>
              <Countdown18 />
            </div>
            <div className="hidden md:block w-0.5 h-20 bg-[#27251f]" aria-hidden="true" />
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <IslandButton href="#register" kind="red">Записаться</IslandButton>
              <IslandButton href="#about" kind="ghost">Узнать больше</IslandButton>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Лента городов */}
      <motion.div
        className="mt-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <CalmMarquee />
      </motion.div>
    </section>
  )
}
