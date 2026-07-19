import { motion } from 'framer-motion'

const EASE = [0.32, 0.72, 0, 1]

/* «О НАС ПИШУТ» в эдиториале: плашки-металл с гравировкой, к каждой
   от края прорисовывается строгая стальная линейка (вместо змеек v15 —
   швейцарская дисциплина). Цитаты — ЗАГЛУШКИ по просьбе заказчика. */
const ROWS = [
  {
    outlet: 'Деловая газета. Юг',
    quote: 'Программа помогает ветеранам сделать первый шаг из армии в собственное дело',
    side: 'left',
  },
  {
    outlet: 'Кубань 24',
    quote: 'Семь городов края примут бесплатные бизнес-интенсивы для участников СВО и их семей',
    side: 'right',
  },
  {
    outlet: 'РБК Краснодар',
    quote: 'Пример программы, где за словами сразу следует план действий',
    side: 'left',
  },
]

export default function Press15() {
  return (
    <section id="press" className="relative px-6 lg:px-10 py-24 md:py-36 overflow-hidden">
      <div className="secnum16 absolute right-[2vw] top-14 text-[min(16vw,180px)]" aria-hidden="true">
        05
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.span
          className="eyebrow16 mb-8 inline-flex"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          Пресса
        </motion.span>

        <motion.h2
          className="text-[#154734] font-black text-4xl md:text-6xl mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          О нас пишут
        </motion.h2>

        <div className="space-y-14 md:space-y-20">
          {ROWS.map(({ outlet, quote, side }, i) => {
            const left = side === 'left'
            return (
              <div key={outlet} className="relative flex items-center min-h-[180px]">
                {/* Стальная линейка от края экрана к плашке */}
                <motion.div
                  className={`metalrule16 absolute top-1/2 -translate-y-1/2 hidden md:block ${
                    left ? 'right-0 left-[-10vw]' : 'left-0 right-[-10vw]'
                  }`}
                  style={{ transformOrigin: left ? 'left center' : 'right center' }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 1.3, ease: EASE }}
                  aria-hidden="true"
                />
                <motion.figure
                  className={`relative z-10 w-[min(560px,100%)] ${left ? 'mr-auto' : 'ml-auto'}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
                >
                  <div className="tray16">
                    <div className="plaque13 relative px-8 py-7 sm:px-10 sm:py-8 rounded-[calc(1.6rem-0.4rem)]">
                      <figcaption className="plaque13-text font-black uppercase tracking-[0.14em] text-[13px] sm:text-sm">
                        {outlet}
                      </figcaption>
                      <blockquote className="plaque13-text mt-3 font-semibold text-[15px] sm:text-lg leading-snug">
                        «{quote}»
                      </blockquote>
                    </div>
                  </div>
                </motion.figure>
              </div>
            )
          })}
        </div>

        <p className="text-[#8a7a66]/70 text-xs mt-10">
          Примеры вида публикаций. Реальные материалы появятся здесь после старта программы.
        </p>
      </div>
    </section>
  )
}
