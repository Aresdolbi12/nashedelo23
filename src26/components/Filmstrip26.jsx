import { motion } from 'framer-motion'
import { SCHEDULE } from '../content.js'

const EASE = [0.19, 1, 0.22, 1]

/* География v26: кинолента. Семь городов — семь кадров на плёнке
   с перфорацией; лента въезжает сбоку, кадры проявляются каскадом.
   На мобильных прокручивается свайпом (scroll-snap). */
export default function Filmstrip26() {
  return (
    <section id="schedule" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.h2
          className="relative text-[#f2ece3] font-black text-4xl md:text-6xl mb-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="echo-text15 absolute -top-[0.55em] left-[0.1em] text-[1.5em] font-black" aria-hidden="true">
            Кадры
          </span>
          <span className="relative">Обучение пройдет в семи городах Краснодарского края</span>
        </motion.h2>
        <motion.p
          className="text-[#d9bfa8] text-lg max-w-xl mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        >
          Возможность выбрать площадку, до которой удобно добраться
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: EASE }}
      >
        <div className="film26 relative">
          <div className="film26-holes film26-holes-top" aria-hidden="true" />
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-6 lg:px-10 py-5 film26-track">
            {SCHEDULE.map(({ dates, city, group }, i) => (
              <motion.div
                key={group}
                className="frame26 snap-center shrink-0 w-[228px] md:w-[248px] px-6 py-6"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.07 }}
              >
                <div className="text-[#d9bfa8]/70 font-bold text-xs tracking-[0.2em]" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')} / 07
                </div>
                <div className="font-black text-2xl text-[#27251f] mt-3">{city}</div>
                <div className="text-[#623b2a] font-semibold mt-1">{dates}</div>
                <div className="text-sm text-gray-500 mt-2">
                  Место: <span className="italic">на уточнении</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="film26-holes film26-holes-bottom" aria-hidden="true" />
        </div>
      </motion.div>
    </section>
  )
}
