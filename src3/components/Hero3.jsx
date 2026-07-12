import { motion } from 'framer-motion'
import { ArrowIcon } from '../../src2/components/shared2.jsx'

const EASE = [0.19, 1, 0.22, 1]

/* Строка заголовка, выезжающая из-под маски */
function MaskedLine({ children, delay = 0, className = '' }) {
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: '112%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default function Hero3() {
  return (
    <section id="top" className="min-h-screen flex flex-col justify-center relative px-6 lg:px-10 pt-28 pb-20">
      <div className="max-w-6xl mx-auto w-full">
        <motion.p
          className="text-[#a8c8dc] font-medium mb-6 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          Для ветеранов боевых действий, участников СВО и их семей
        </motion.p>

        <h1 className="font-black text-white text-[clamp(3rem,9.5vw,7.5rem)] leading-[0.98] mb-8">
          <MaskedLine delay={0.15}>Наше дело —</MaskedLine>
          <MaskedLine delay={0.3}>начать своё.</MaskedLine>
        </h1>

        <motion.p
          className="text-white/80 text-lg md:text-xl max-w-xl leading-relaxed mb-10 font-light"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
        >
          Бесплатная практическая программа о предпринимательстве: два дня интенсива,
          вебинары и личная дорожная карта — от идеи до устойчивого бизнеса.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.1 }}
        >
          <a href="#register" className="btn-light inline-flex items-center gap-3 px-8 py-4 font-bold">
            Записаться
            <ArrowIcon size={18} />
          </a>
          <a href="#about" className="btn-ghost3 px-8 py-4 font-semibold">
            Узнать больше
          </a>
        </motion.div>
      </div>

      {/* Намёк на скролл: рассвет ниже */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-xs font-medium tracking-wide">листайте — светает</span>
        <motion.svg
          width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </motion.div>
    </section>
  )
}
