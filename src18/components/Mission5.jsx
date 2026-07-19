import { motion } from 'framer-motion'
import { Counter } from '../../src2/components/shared2.jsx'

const EASE = [0.32, 0.72, 0, 1]

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

const STATS = [
  { value: 2, label: 'дня очного интенсива' },
  { value: 9, label: 'экспертов-практиков' },
  { value: 7, label: 'городов Краснодарского края' },
  { value: 100, suffix: '%', label: 'бесплатно для участников' },
]

/* Пословное проявление — фирменный приём с v3, живёт и в эдиториале */
const wordVariants = {
  hidden: { opacity: 0.12 },
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

/* Линейка, прорисовывающаяся от левого края */
function DrawnRule({ delay = 0 }) {
  return (
    <motion.div
      className="h-[2px] bg-[#27251f] origin-left"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    />
  )
}

export default function Mission5() {
  return (
    <section id="about" className="relative px-6 lg:px-10 py-24 md:py-36">
      {/* Гигантский номер секции у правого края */}
      <div className="secnum16 absolute right-[2vw] top-14 text-[min(16vw,180px)]" aria-hidden="true">
        01
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.span
          className="eyebrow16 mb-10 inline-flex"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          О проекте
        </motion.span>

        <WordReveal
          text={MISSION_1}
          className="text-[#27251f] text-2xl md:text-[2.6rem] font-semibold leading-snug md:leading-[1.25] max-w-4xl"
        />
        <WordReveal
          text={MISSION_2}
          className="text-[#4a4238] text-xl md:text-2xl font-medium leading-snug max-w-3xl mt-10"
        />

        <motion.p
          className="text-[#6b5f50] text-lg leading-relaxed max-w-2xl mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          Программа открыта для всех: и для тех, кто только задумывается о собственном деле,
          и для действующих предпринимателей, которые хотят систематизировать знания и найти
          новые точки роста.
        </motion.p>

        {/* Статистика: эдиториал-строки с линейками и гигантскими цифрами */}
        <div className="mt-20 md:mt-28">
          {STATS.map(({ value, suffix, label }, i) => (
            <div key={label}>
              <DrawnRule delay={i * 0.08} />
              <motion.div
                className="grid grid-cols-[auto_1fr] md:grid-cols-[220px_1fr_auto] items-baseline gap-x-8 py-6 md:py-7"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
              >
                <div
                  className="text-[#154734] font-black text-6xl md:text-8xl tracking-tight leading-none"
                  style={{ fontFamily: "'Unbounded', sans-serif", fontWeight: 800 }}
                >
                  <Counter value={value} suffix={suffix} />
                </div>
                <div className="text-[#4a4238] text-base md:text-xl font-medium">{label}</div>
                <div className="hidden md:block text-[#e04e39] text-xs font-bold tracking-[0.25em] uppercase">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </motion.div>
            </div>
          ))}
          <DrawnRule delay={0.32} />
        </div>

        {/* Итоги */}
        <div className="mt-20 md:mt-28 grid lg:grid-cols-12 gap-10">
          <motion.h2
            className="lg:col-span-4 text-[#154734] font-black text-3xl md:text-4xl"
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
                className="border-t-2 border-[#27251f] py-6 flex items-baseline gap-6 group"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
              >
                <span className="text-[#e04e39] font-bold text-sm tracking-widest flex-shrink-0" style={{ fontFamily: "'Unbounded', sans-serif" }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[#27251f] font-semibold text-lg md:text-2xl leading-snug transition-transform duration-500 group-hover:translate-x-2" style={{ transitionTimingFunction: 'cubic-bezier(0.32,0.72,0,1)' }}>
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
