import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Counter } from '../../src2/components/shared2.jsx'
import { BENEFITS } from '../../src2/content.js'

const EASE = [0.19, 1, 0.22, 1]

const MISSION =
  '«Наше дело» — практическая образовательная программа о развитии предпринимательских навыков. Мы даём системные знания для самостоятельного ведения бизнеса: от оценки рыночных возможностей до устойчивой модели доходов. Очные интенсивы, вебинары, индивидуальные консультации — и ваша личная дорожная карта.'

/* Текст, проявляющийся слово за словом по мере скролла */
function WordReveal({ text }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] })
  const words = text.split(' ')

  return (
    <p ref={ref} className="text-white text-2xl md:text-4xl font-semibold leading-snug max-w-4xl">
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  )
}

function Word({ progress, range, children }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{' '}
    </motion.span>
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
    <section id="about" className="relative px-6 lg:px-10 py-28 md:py-40">
      <div className="max-w-6xl mx-auto">
        <WordReveal text={MISSION} />

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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12 mt-24">
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

        <div className="mt-28 grid lg:grid-cols-12 gap-10">
          <motion.h2
            className="lg:col-span-4 text-white font-black text-3xl md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            Что вы увезёте с собой
          </motion.h2>
          <div className="lg:col-span-8">
            {BENEFITS.map(({ title, text }, i) => (
              <motion.div
                key={title}
                className="border-t border-white/30 py-6 grid sm:grid-cols-[220px_1fr] gap-2 sm:gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
              >
                <div className="text-white font-bold text-lg">{title}</div>
                <div className="text-white/70 leading-relaxed">{text}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
