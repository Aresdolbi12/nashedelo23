import { motion, useReducedMotion } from 'framer-motion'
import { Counter } from './shared33.jsx'

const EASE = [0.19, 1, 0.22, 1]

/* Суть двух абзацев миссии, разложенная тезисами по табличкам
   с подсветкой границ при наведении (frame15:hover) */
const THESES = [
  ['Развитие предпринимательских навыков', 'От оценки рыночных возможностей до устойчивой модели доходов'],
  ['Очные интенсивы', 'Основа программы — живая практика в семи городах края'],
  ['Вебинары и консультации', 'Онлайн-занятия и индивидуальная работа с экспертами'],
  ['Инструменты поддержки', 'Координация в системе мер государственной поддержки'],
]

const RESULTS = [
  'Понимание, как устроен бизнес изнутри',
  'Готовый план действий под свою идею',
  'Консультации с опытными экспертами',
  'Информация о льготах, грантах и субсидиях',
  'Навыки управления и работы с людьми',
]

const STATS = [
  { value: 2, label: 'дня очного интенсива' },
  { value: 9, label: 'экспертов-практиков' },
  { value: 7, label: 'городов Краснодарского края' },
  { value: 100, suffix: '%', label: 'бесплатно для участников' },
]

export default function Mission5() {
  const reduceMotion = useReducedMotion()
  return (
    <section id="about" className="relative px-6 lg:px-10 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        {/* Тезисы v25: гравированные плиты — рамка дорисовывается штрихом */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
          {THESES.map(([title, text], i) => (
            <motion.div
              key={title}
              className="th25 relative p-6 md:p-7"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
            >
              <svg className="absolute inset-0 w-full h-full overflow-visible" fill="none" aria-hidden="true">
                <motion.rect
                  x="0.6"
                  y="0.6"
                  rx="15"
                  style={{ width: 'calc(100% - 1.2px)', height: 'calc(100% - 1.2px)' }}
                  className="th25-frame"
                  stroke="rgba(217, 191, 168, 0.4)"
                  strokeWidth="1.2"
                  initial={reduceMotion ? false : { pathLength: 0 }}
                  whileInView={reduceMotion ? undefined : { pathLength: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 1, ease: [0.65, 0, 0.35, 1], delay: 0.15 + i * 0.07 }}
                />
              </svg>
              <div className="relative qp25-engraved text-[#f2ece3] font-black text-lg md:text-xl leading-snug">{title}</div>
              <div className="relative text-[#d9c9b8]/85 text-sm md:text-base leading-relaxed mt-2.5">{text}</div>
            </motion.div>
          ))}
        </div>

        {/* Неизменный абзац */}
        <motion.p
          className="text-white/75 text-lg leading-relaxed max-w-2xl mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          Программа открыта для всех: и для тех, кто только задумывается о собственном деле,
          и для действующих предпринимателей, которые хотят систематизировать знания и найти
          новые точки роста.
        </motion.p>

        {/* Статистика строками: крупная цифра слева, подпись справа */}
        <div className="mt-20 md:mt-24">
          {STATS.map(({ value, suffix, label }, i) => (
            <motion.div
              key={label}
              className="grid grid-cols-[auto_1fr] items-center gap-6 md:gap-10 border-t border-[#d9bfa8]/30 py-4 md:py-5"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.07 }}
            >
              <div className="grad-num15 font-black text-6xl md:text-[6.5rem] leading-[1.05] tracking-tight">
                <Counter value={value} suffix={suffix} />
              </div>
              <div className="text-[#d9bfa8]/90 text-sm md:text-lg font-semibold uppercase tracking-[0.14em]">
                {label}
              </div>
            </motion.div>
          ))}
          <div className="border-t border-[#d9bfa8]/30" />
        </div>

        {/* Итоги — без изменений */}
        <div className="mt-20 md:mt-24 grid lg:grid-cols-12 gap-10">
          <motion.h2
            className="lg:col-span-4 relative text-white font-black text-3xl md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="echo-text15 absolute -top-[0.72em] left-0 text-[1.55em] font-black" aria-hidden="true">
              Итоги
            </span>
            <span className="relative">Что вы получите в итоге</span>
          </motion.h2>
          <div className="lg:col-span-8">
            {RESULTS.map((item, i) => (
              <motion.div
                key={item}
                className="border-t border-[#d9bfa8]/30 py-6 flex items-baseline gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
              >
                <span className="text-[#d9bfa8] font-bold text-sm tracking-widest flex-shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-white font-semibold text-lg md:text-2xl leading-snug">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
