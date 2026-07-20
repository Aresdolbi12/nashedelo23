import { motion, useReducedMotion } from 'framer-motion'
import { Counter } from '../../src2/components/shared2.jsx'

const EASE = [0.19, 1, 0.22, 1]

/* Суть двух абзацев миссии, разложенная тезисами по табличкам
   с подсветкой границ при наведении (frame15:hover) */
const THESES = [
  ['Предпринимательские навыки', 'Проект даёт системные знания для самостоятельного ведения бизнеса'],
  ['Рынок и модель доходов', 'От оценки рыночных возможностей до устойчивой экономики дела'],
  ['Очные бизнес-интенсивы', 'Основа программы — живая практика в вашем городе'],
  ['Вебинары', 'Онлайн-разборы ключевых тем с экспертами программы'],
  ['Индивидуальные консультации', 'Личная работа с экспертом над вашей задачей'],
  ['Маркетинг, финучёт, господдержка', 'Прикладные темы и работа с госструктурами'],
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
        {/* Тезисы v30: регламент — двойные рамки, римские номера */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {THESES.map(([title, text], i) => (
            <motion.div
              key={title}
              className="th30 relative p-6 md:p-7"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: EASE, delay: (i % 3) * 0.12 }}
            >
              <div className="th30-num font-bold text-sm" aria-hidden="true">
                {['I', 'II', 'III', 'IV', 'V', 'VI'][i]}
              </div>
              <div className="text-[#f2ece3] font-black text-lg md:text-xl leading-snug mt-3">{title}</div>
              <div className="text-[#d9c9b8]/85 text-sm md:text-base leading-relaxed mt-2.5">{text}</div>
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

        {/* Статистика строками (конструкция crpp stat-row): подпись слева, цифра справа */}
        <div className="mt-20 md:mt-24">
          {STATS.map(({ value, suffix, label }, i) => (
            <motion.div
              key={label}
              className="grid grid-cols-[1fr_auto] items-center gap-6 border-t border-[#d9bfa8]/30 py-4 md:py-5"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.07 }}
            >
              <div className="text-[#d9bfa8]/90 text-sm md:text-lg font-semibold uppercase tracking-[0.14em]">
                {label}
              </div>
              <div className="grad-num15 font-black text-6xl md:text-[6.5rem] leading-[1.05] tracking-tight text-right">
                <Counter value={value} suffix={suffix} />
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
                  {['I', 'II', 'III', 'IV', 'V'][i]}
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
