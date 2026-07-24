import { motion } from 'framer-motion'
import { ArrowIcon } from './shared33.jsx'

const EASE = [0.19, 1, 0.22, 1]

/* Баннер «Меры поддержки бизнеса участников СВО» (просьба заказчика 24.07):
   яркая красная плита 7417C перед подвалом, ведёт на moibiz93.ru/svo-support.
   Красный на сайте зарезервирован под акценты — поэтому баннер единственный
   крупный красный блок и читается мгновенно. */
export default function SvoSupport33() {
  return (
    <section id="svo-support" className="relative px-6 lg:px-10 pb-24 md:pb-32">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <a
          href="https://moibiz93.ru/svo-support/"
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-[#e04e39] rounded-[28px] px-8 py-9 md:px-12 md:py-11 shadow-[0_24px_60px_rgba(224,78,57,0.35)] hover:shadow-[0_28px_70px_rgba(224,78,57,0.5)] hover:-translate-y-0.5 transition-all duration-300"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            {/* Звезда — знак программы */}
            <svg
              viewBox="0 0 64 64"
              className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 text-white/90"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M32 6l7.6 17.2L58 25.4 44 38l4.2 18.6L32 46.8 15.8 56.6 20 38 6 25.4l18.4-2.2z" />
            </svg>
            <div className="flex-1">
              <div className="text-white/80 text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2">
                Центр «Мой бизнес» · Краснодарский край
              </div>
              <div className="text-white font-black text-xl md:text-3xl leading-tight text-balance">
                Меры поддержки бизнеса участников СВО
              </div>
            </div>
            <span className="btn-light inline-flex items-center justify-center gap-3 px-7 py-4 font-bold whitespace-nowrap md:self-center group-hover:gap-4 transition-all">
              Смотреть меры
              <ArrowIcon size={17} />
            </span>
          </div>
        </a>
      </motion.div>
    </section>
  )
}
