import { motion } from 'framer-motion'
import { ArrowIcon } from '../../src2/components/shared2.jsx'

const EASE = [0.19, 1, 0.22, 1]

/* «О нас пишут» v31: новости идут друг за другом (стопка), без нитей —
   нити теперь у цитат. Границы табличек подсвечиваются при наведении
   (как у тезисов «О проекте»), у каждой — кнопка «Читать материал».
   Цитаты — ЗАГЛУШКИ по просьбе заказчика. */
const ROWS = [
  {
    outlet: 'Деловая газета. Юг',
    quote: 'Программа помогает ветеранам сделать первый шаг из армии в собственное дело',
  },
  {
    outlet: 'Кубань 24',
    quote: 'Семь городов края примут бесплатные бизнес-интенсивы для участников СВО и их семей',
  },
  {
    outlet: 'РБК Краснодар',
    quote: 'Пример программы, где за словами сразу следует план действий',
  },
]

export default function Press15() {
  return (
    <section id="press" className="relative px-6 lg:px-10 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="relative text-[#f2ece3] font-black text-4xl md:text-6xl mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="echo-text15 absolute -top-[0.55em] left-[0.1em] text-[1.5em] font-black" aria-hidden="true">
            Пресса
          </span>
          <span className="relative">О нас пишут</span>
        </motion.h2>

        <div className="space-y-6 md:space-y-8 max-w-3xl">
          {ROWS.map(({ outlet, quote }, i) => (
            <motion.figure
              key={outlet}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
            >
              <div className="plaque22 newsplaque31 relative px-8 py-7 sm:px-10 sm:py-8">
                <figcaption className="text-[#623b2a] font-black uppercase tracking-[0.14em] text-[13px] sm:text-sm">
                  {outlet}
                </figcaption>
                <blockquote className="text-[#27251f] mt-3 font-semibold text-[15px] sm:text-lg leading-snug">
                  «{quote}»
                </blockquote>
                <a href="#" className="btn-read31 mt-6" aria-label={`Читать материал: ${outlet}`}>
                  Читать материал
                  <ArrowIcon size={15} />
                </a>
              </div>
            </motion.figure>
          ))}
        </div>

        <p className="text-[#d9c9b8]/45 text-xs mt-10">
          Примеры вида публикаций. Реальные материалы появятся здесь после старта программы.
        </p>
      </div>
    </section>
  )
}
