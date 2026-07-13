import { motion } from 'framer-motion'
import { Counter } from '../../src2/components/shared2.jsx'
import { BENEFITS } from '../../src2/content.js'

const EASE = [0.19, 1, 0.22, 1]

const stamp = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } },
}

const group = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }

const STATS = [
  { value: 2, label: 'дня интенсива' },
  { value: 9, label: 'экспертов' },
  { value: 7, label: 'городов' },
  { value: 100, suffix: '%', label: 'бесплатно' },
]

export default function About4() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <motion.h2
              className="font-poster font-bold text-4xl md:text-6xl leading-[0.95] mb-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stamp}
            >
              Система знаний
              <br />
              для <span className="bg-[color:var(--blue)] text-white px-3 inline-block -rotate-1">своего</span> дела
            </motion.h2>

            <motion.div
              className="space-y-5 text-lg leading-relaxed max-w-xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={group}
            >
              {[
                '«Наше дело» — практическая образовательная программа о развитии предпринимательских навыков для ветеранов боевых действий, участников СВО и их семей.',
                'Задача — дать системные знания для самостоятельного ведения бизнеса: от оценки рыночных возможностей до устойчивой модели доходов. В основе — очные интенсивы, вебинары и индивидуальные консультации.',
                'Программа открыта и для тех, кто только присматривается к своему делу, и для действующих предпринимателей.',
              ].map((p) => (
                <motion.p key={p.slice(0, 20)} variants={stamp}>{p}</motion.p>
              ))}
            </motion.div>
          </div>

          {/* Колонка-столбец с цифрами */}
          <motion.div
            className="lg:col-span-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={group}
          >
            <div className="bg-[color:var(--ink)] text-[color:var(--paper)] p-8 md:p-10 rotate-1 print-shadow-blue">
              <div className="font-poster font-medium text-sm tracking-widest text-[color:var(--sky)] mb-8 uppercase">
                Программа в цифрах
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                {STATS.map(({ value, suffix, label }) => (
                  <motion.div key={label} variants={stamp}>
                    <div className="font-poster font-bold text-6xl md:text-7xl leading-none">
                      <Counter value={value} suffix={suffix} />
                    </div>
                    <div className="mt-2 text-[color:var(--paper)]/70">{label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Что вы получите — нумерованный плакатный список */}
        <motion.div
          className="mt-24 grid md:grid-cols-2 gap-x-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={group}
        >
          {BENEFITS.map(({ title, text }, i) => (
            <motion.div key={title} variants={stamp} className="flex gap-6 py-7 border-t-4 border-[color:var(--ink)]">
              <div className="font-poster font-bold text-5xl text-[color:var(--blue)] leading-none">
                {i + 1}
              </div>
              <div>
                <h3 className="font-poster font-semibold text-2xl mb-1.5">{title}</h3>
                <p className="text-[color:var(--ink)]/75 leading-relaxed">{text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
