import { motion } from 'framer-motion'
import { SCHEDULE } from '../content.js'

const EASE = [0.19, 1, 0.22, 1]

/* География v30: церемониальный регламент — города по центру,
   между ними гравированные линии с ромбом; ромб загорается при наведении. */
export default function Schedule30() {
  return (
    <section id="schedule" className="relative px-6 lg:px-10 py-24 md:py-32">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="relative text-[#f2ece3] font-black text-4xl md:text-6xl mb-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <span className="echo-text15 absolute -top-[0.55em] left-1/2 -translate-x-1/2 text-[1.5em] font-black" aria-hidden="true">
            Города
          </span>
          <span className="relative">Обучение пройдет в семи городах Краснодарского края</span>
        </motion.h2>
        <motion.p
          className="text-[#d9bfa8] text-lg mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        >
          Возможность выбрать площадку, до которой удобно добраться
        </motion.p>

        <div>
          {SCHEDULE.map(({ dates, city, group }, i) => (
            <motion.div
              key={group}
              className="cer30 group py-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, ease: EASE, delay: (i % 3) * 0.08 }}
            >
              {i > 0 && (
                <span className="cer30-rule flex items-center justify-center gap-4 mb-6" aria-hidden="true">
                  <span className="h-px flex-1 max-w-[180px] bg-gradient-to-r from-transparent to-[#d9bfa8]/45" />
                  <span className="cer30-diamond w-2 h-2 rotate-45 border border-[#d9bfa8]/60 inline-block" />
                  <span className="h-px flex-1 max-w-[180px] bg-gradient-to-l from-transparent to-[#d9bfa8]/45" />
                </span>
              )}
              <div className="font-black text-3xl md:text-4xl text-[#f2ece3] group-hover:text-white transition-colors">
                {city}
              </div>
              <div className="text-[#d9bfa8] font-semibold mt-1.5">{dates}</div>
              <div className="text-sm text-[#d9bfa8]/55 mt-1">
                Место: <span className="italic">на уточнении</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
