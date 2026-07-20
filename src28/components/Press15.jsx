import { motion } from 'framer-motion'

const EASE = [0.19, 1, 0.22, 1]

/* «О нас пишут»: бежевые таблички (по мотивам карточек «Мой Бизнес Forum»,
   палитра наша) со светящимися нитями-подводками из варианта 17.
   Цитаты — ЗАГЛУШКИ по просьбе заказчика. */
const ROWS = [
  {
    outlet: 'Деловая газета. Юг',
    quote: 'Программа помогает ветеранам сделать первый шаг из армии в собственное дело',
    side: 'left',
    path: 'M -60 52 H 360 a 56 56 0 0 1 56 56 v 28 a 56 56 0 0 1 -56 56 H 150',
  },
  {
    outlet: 'Кубань 24',
    quote: 'Семь городов края примут бесплатные бизнес-интенсивы для участников СВО и их семей',
    side: 'right',
    path: 'M 860 40 H 430 a 52 52 0 0 0 -52 52 v 20 a 52 52 0 0 0 52 52 h 210 a 44 44 0 0 1 44 44 v 60',
  },
  {
    outlet: 'РБК Краснодар',
    quote: 'Пример программы, где за словами сразу следует план действий',
    side: 'left',
    path: 'M -60 190 H 240 a 50 50 0 0 0 50 -50 v -30 a 48 48 0 0 1 48 -48 h 250',
  },
]

/* Светящаяся нить (анимация из «О нас пишут» варианта 17) */
function Thread({ d, id }) {
  return (
    <svg
      className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[min(1100px,100vw)] h-full hidden md:block"
      viewBox="0 0 800 260"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0.25">
          <stop offset="0" stopColor="#f6e9d8" />
          <stop offset="0.5" stopColor="#d9bfa8" />
          <stop offset="1" stopColor="#8f6f52" />
        </linearGradient>
      </defs>
      <motion.path
        d={d}
        className="thread17"
        stroke={`url(#${id})`}
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '-120px' }}
        transition={{ duration: 1.6, ease: EASE }}
      />
    </svg>
  )
}

export default function Press15() {
  return (
    <section id="press" className="relative px-6 lg:px-10 py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="relative text-[#f2ece3] font-black uppercase leading-[0.95] text-[clamp(2.6rem,6.5vw,5.6rem)] mb-16"
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

        <div className="space-y-16 md:space-y-24">
          {ROWS.map(({ outlet, quote, side, path }, i) => {
            const left = side === 'left'
            return (
              <div key={outlet} className="relative min-h-[210px] md:min-h-[250px] flex items-center">
                <Thread d={path} id={`thread22-${i}`} />
                <motion.figure
                  className={`relative z-10 w-[min(540px,100%)] ${left ? 'mr-auto' : 'ml-auto'}`}
                  initial={{ opacity: 0, x: left ? -60 : 60, rotate: left ? -1.2 : 1.2 }}
                  whileInView={{ opacity: 1, x: 0, rotate: left ? -0.4 : 0.4 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
                >
                  <div className="plaque22 relative px-8 py-7 sm:px-10 sm:py-8">
                    <figcaption className="text-[#623b2a] font-black uppercase tracking-[0.14em] text-[13px] sm:text-sm">
                      {outlet}
                    </figcaption>
                    <blockquote className="text-[#27251f] mt-3 font-semibold text-[15px] sm:text-lg leading-snug">
                      «{quote}»
                    </blockquote>
                  </div>
                </motion.figure>
              </div>
            )
          })}
        </div>

        <p className="text-[#d9c9b8]/45 text-xs mt-10">
          Примеры вида публикаций. Реальные материалы появятся здесь после старта программы.
        </p>
      </div>
    </section>
  )
}
