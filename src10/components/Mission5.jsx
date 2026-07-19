import { motion } from 'framer-motion'
import { Counter } from '../../src2/components/shared2.jsx'

const EASE = [0.19, 1, 0.22, 1]

const MISSION_1 =
  'Проект посвящён развитию предпринимательских навыков. Задача — дать системные знания, необходимые для самостоятельного ведения бизнеса: от оценки рыночных возможностей до построения устойчивой модели доходов.'

const MISSION_2 =
  'В основе программы — очные бизнес-интенсивы, вебинары и индивидуальные консультации. Участники изучат маркетинг, финансовый учёт, взаимодействие с государственными структурами и инструменты получения поддержки.'

const RESULTS = [
  'Понимание, как устроен бизнес изнутри',
  'Готовый план действий под свою идею',
  'Консультации с опытными экспертами',
  'Информация о льготах, грантах и субсидиях',
  'Навыки управления и работы с людьми',
]

/* Текст проявляется слово за словом сам, как только попал в поле зрения —
   скроллить дальше не нужно */
const wordVariants = {
  hidden: { opacity: 0.15 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

function WordReveal({ text, className }) {
  const words = text.split(' ')
  return (
    <motion.p
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-90px' }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.028 } } }}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={wordVariants} className="inline">
          {word}{' '}
        </motion.span>
      ))}
    </motion.p>
  )
}

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
        <WordReveal
          text={MISSION_1}
          className="text-white text-2xl md:text-4xl font-semibold leading-snug max-w-4xl"
        />
        <WordReveal
          text={MISSION_2}
          className="text-white/95 text-xl md:text-2xl font-medium leading-snug max-w-3xl mt-10"
        />

        <motion.p
          className="text-white/70 text-lg leading-relaxed max-w-2xl mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          Программа открыта для всех: и для тех, кто только задумывается о собственном деле,
          и для действующих предпринимателей, которые хотят систематизировать знания и найти
          новые точки роста.
        </motion.p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12 mt-20 md:mt-24">
          {STATS.map(({ value, suffix, label }, i) => (
            <motion.div
              key={label}
              className="border-t border-white/30 pt-5"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
            >
              <div className="text-white font-black text-5xl md:text-6xl tracking-tight">
                <Counter value={value} suffix={suffix} />
              </div>
              <div className="text-white/70 mt-2 text-sm md:text-base">{label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 md:mt-24 grid lg:grid-cols-12 gap-10">
          <motion.h2
            className="lg:col-span-4 text-white font-black text-3xl md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            Что вы получите в итоге
          </motion.h2>
          <div className="lg:col-span-8">
            {RESULTS.map((item, i) => (
              <motion.div
                key={item}
                className="border-t border-white/30 py-6 flex items-baseline gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
              >
                <span className="text-[#a8c8dc] font-bold text-sm tracking-widest flex-shrink-0">
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
