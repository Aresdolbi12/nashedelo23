import { motion } from 'framer-motion'
import { SCHEDULE } from '../content.js'

const EASE = [0.32, 0.72, 0, 1]

/* География «Эдиториал»: таблица-афиша. Строки с линейками сетки,
   номер · город · даты; hover инвертирует строку в тёмно-зелёный
   (приём из v4 «Плаката», который нравился по фидбеку). */
export default function Schedule5() {
  return (
    <section id="schedule" className="relative px-6 lg:px-10 py-24 md:py-36">
      <div className="secnum16 absolute right-[2vw] top-14 text-[min(16vw,180px)]" aria-hidden="true">
        03
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.span
          className="eyebrow16 mb-8 inline-flex"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          География
        </motion.span>

        <motion.h2
          className="text-[#154734] font-black text-4xl md:text-6xl mb-4 max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          Обучение пройдет в семи городах Краснодарского края
        </motion.h2>
        <motion.p
          className="text-[#6b5f50] text-lg max-w-xl mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        >
          Возможность выбрать площадку, до которой удобно добраться
        </motion.p>

        <div>
          {SCHEDULE.map(({ dates, city }, i) => (
            <motion.div
              key={city}
              className="cityrow16"
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
            >
              <span className="cityrow16-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-black text-2xl md:text-4xl tracking-tight">{city}</span>
              <span className="cityrow16-dates text-sm md:text-lg">{dates}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-[#8a7a66] text-sm mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Площадки в каждом городе — на уточнении.
        </motion.p>
      </div>
    </section>
  )
}
