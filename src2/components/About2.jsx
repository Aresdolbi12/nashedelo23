import { motion } from 'framer-motion'
import { DimensionLine, Reveal, Rivets, Stamp, staggerGroup, staggerItem } from './shared2.jsx'
import { BENEFITS } from '../content.js'

export default function About2() {
  return (
    <section id="about" className="py-24 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Stamp num={2} name="О проекте" className="mb-10" />

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <Reveal className="lg:col-span-6">
            <h2 className="font-display font-black text-4xl md:text-5xl text-[color:var(--ink)] leading-[1.05] mb-6">
              Фундамент закладывается <span className="text-outline">по чертежу</span>
            </h2>
            <DimensionLine label="основание" className="max-w-xs mb-8" />
            <div className="space-y-5 text-[17px] leading-relaxed text-[#2c3d55]">
              <p>
                <strong className="font-display text-[color:var(--ink)]">«Наше дело»</strong> — практическая
                образовательная программа для ветеранов боевых действий, участников Специальной военной
                операции и их семей. Проект посвящён развитию предпринимательских навыков.
              </p>
              <p>
                Задача — дать системные знания для самостоятельного ведения бизнеса: от оценки рыночных
                возможностей до построения устойчивой модели доходов. В основе — очные бизнес-интенсивы,
                вебинары и индивидуальные консультации.
              </p>
              <p>
                Программа открыта для всех: и для тех, кто только задумывается о собственном деле,
                и для действующих предпринимателей, которые хотят систематизировать знания и найти
                новые точки роста.
              </p>
            </div>
          </Reveal>

          {/* Спецификация — как таблица на чертеже */}
          <Reveal className="lg:col-span-6">
            <div className="plate chamfer">
              <div className="plate-face chamfer p-1 relative">
                <Rivets />
                <div className="px-6 pt-6 pb-2">
                  <div className="flex items-baseline justify-between border-b-2 border-[color:var(--ink)] pb-3">
                    <h3 className="font-display font-bold text-xl text-[color:var(--ink)]">Спецификация</h3>
                    <span className="text-[11px] tracking-[0.2em] uppercase text-gray-500">что вы получите</span>
                  </div>
                </div>
                <motion.div
                  variants={staggerGroup}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                >
                  {BENEFITS.map(({ pos, title, text }) => (
                    <motion.div key={pos} variants={staggerItem} className="spec-row">
                      <div className="spec-pos py-5">{pos}</div>
                      <div className="px-5 py-5">
                        <div className="font-bold text-[color:var(--ink)]">{title}</div>
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">{text}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                <div className="px-6 py-4 text-[11px] tracking-[0.15em] uppercase text-gray-500">
                  Масштаб 1:1 · без допусков · участие бесплатное
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
