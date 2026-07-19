import { motion } from 'framer-motion'
import Countdown18 from './Countdown18.jsx'

const EASE = [0.23, 1, 0.32, 1]

export default function MidCta21() {
  return (
    <section className="relative px-6 lg:px-10 py-6 md:py-10" aria-label="Запись на программу">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="frame15 p-7 md:p-9 flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div>
            <div className="text-[#f2ece3] font-black text-xl md:text-2xl">
              Понравились темы? Места распределяются по мере записи
            </div>
            <div className="text-[#d9bfa8]/85 text-sm md:text-base mt-1.5">
              Заполнение анкеты занимает пару минут. Участие бесплатное.
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-5 shrink-0">
            <Countdown18 />
            <a href="#register" className="btn-ink px-7 py-4 font-bold whitespace-nowrap">
              Записаться бесплатно
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
