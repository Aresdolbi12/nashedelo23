import { motion } from 'framer-motion'
import { SCHEDULE } from '../content.js'

const HARD = [0.16, 1, 0.3, 1]

/* География v28: типографская афиша — города огромным кеглем строками,
   flood-инверсия строки при наведении (приём v16, доведённый до плаката). */
export default function Schedule28() {
  return (
    <section id="schedule" className="relative px-6 lg:px-10 py-24 md:py-32 [overflow-x:clip]">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="relative text-[#f2ece3] font-black uppercase leading-[0.98] text-[clamp(2rem,4.6vw,4.2rem)] mb-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: HARD }}
        >
          <span className="echo-text15 absolute -top-[0.55em] left-[0.1em] text-[1.5em] font-black" aria-hidden="true">
            Города
          </span>
          <span className="relative">Обучение пройдет в семи городах Краснодарского края</span>
        </motion.h2>
        <motion.p
          className="text-[#d9bfa8] text-lg max-w-xl mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: HARD, delay: 0.1 }}
        >
          Возможность выбрать площадку, до которой удобно добраться
        </motion.p>

        <div className="border-t-2 border-[#d9bfa8]/40">
          {SCHEDULE.map(({ dates, city, group }, i) => (
            <motion.div
              key={group}
              className="cityrow28 group grid grid-cols-[auto_1fr_auto] items-baseline gap-4 md:gap-8 border-b-2 border-[#d9bfa8]/40 py-4 md:py-5 px-3 md:px-5"
              initial={{ opacity: 0, x: i % 2 ? 60 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: HARD }}
            >
              <span className="font-black text-sm tracking-widest text-[#c58b68] group-hover:text-[#0d2f22]">
                {String(group).padStart(2, '0')}
              </span>
              <span className="font-black uppercase leading-none text-[clamp(1.6rem,4.6vw,4rem)] text-[#f2ece3] group-hover:text-[#0d2f22]">
                {city}
              </span>
              <span className="text-right">
                <span className="block font-bold text-sm md:text-lg text-[#d9bfa8] group-hover:text-[#623b2a]">{dates}</span>
                <span className="block text-xs md:text-sm text-[#d9bfa8]/60 group-hover:text-[#623b2a]/80">
                  место на уточнении
                </span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
