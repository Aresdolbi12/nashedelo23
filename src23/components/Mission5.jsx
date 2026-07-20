import { motion } from 'framer-motion'
import { Counter } from '../../src2/components/shared2.jsx'

const EASE = [0.19, 1, 0.22, 1]

/* Суть двух абзацев миссии, разложенная тезисами по табличкам
   с подсветкой границ при наведении (frame15:hover) */
const THESES = [
  ['Своё дело — это навык', 'Проект развивает предпринимательские навыки: системные знания для самостоятельного ведения бизнеса'],
  ['От рынка до модели доходов', 'Оценка рыночных возможностей и построение устойчивой экономики своего дела'],
  ['Три формата обучения', 'Очные бизнес-интенсивы, вебинары и индивидуальные консультации'],
  ['Прикладные темы', 'Маркетинг, финансовый учёт, работа с госструктурами и инструменты получения поддержки'],
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
  return (
    <section id="about" className="relative px-6 lg:px-10 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        {/* Тезисы v23: контурные таблички лестницей, описание собирается по словам */}
        <div className="flex flex-col gap-5 md:gap-6">
          {THESES.map(([title, text], i) => (
            <motion.div
              key={title}
              className={`th23 p-6 md:p-8 w-full md:w-[76%] ${i % 2 ? 'md:ml-auto' : ''}`}
              initial={{ opacity: 0, x: i % 2 ? 60 : -60, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <div className="text-[#f2ece3] font-black text-xl md:text-2xl leading-snug">{title}</div>
              <motion.p
                className="text-[#d9c9b8]/85 text-sm md:text-base leading-relaxed mt-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.03, delayChildren: 0.3 } } }}
              >
                {text.split(' ').map((w, wi) => (
                  <motion.span
                    key={wi}
                    className="inline-block"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
                    }}
                  >
                    {w}
                    {'\u00a0'}
                  </motion.span>
                ))}
              </motion.p>
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

        {/* Статистика: подпись сверху, крупная градиентная цифра снизу */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12 mt-20 md:mt-24">
          {STATS.map(({ value, suffix, label }, i) => (
            <motion.div
              key={label}
              className="border-t border-[#d9bfa8]/30 pt-5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
            >
              <div className="text-[#d9bfa8]/90 text-xs md:text-sm font-semibold uppercase tracking-[0.14em]">
                {label}
              </div>
              <div className="grad-num15 font-black text-7xl md:text-[6.5rem] leading-[1.05] tracking-tight mt-3">
                <Counter value={value} suffix={suffix} />
              </div>
            </motion.div>
          ))}
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
