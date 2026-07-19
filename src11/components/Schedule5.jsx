import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { SCHEDULE } from '../content.js'

const EASE = [0.19, 1, 0.22, 1]

/* Маршрут из варианта 2: вертикальная трасса, дорисовывающаяся при скролле,
   города — панели по обе стороны. Адаптировано под стиль рассвета. */
export default function Schedule5() {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 0.75', 'end 0.55'],
  })

  return (
    <section id="schedule" className="relative px-6 lg:px-10 py-24 md:py-32">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-[#0f2847] font-black text-4xl md:text-6xl mb-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          Обучение пройдет в семи городах Краснодарского края
        </motion.h2>
        <motion.p
          className="text-[#1e4976] text-lg max-w-xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        >
          Возможность выбрать площадку, до которой удобно добраться
        </motion.p>

        <div ref={listRef} className="relative">
          {/* Трасса маршрута */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-[#0f2847]/20" aria-hidden="true" />
          <motion.div
            className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[3px] -translate-x-[1px] bg-[#1e4976] origin-top rounded-full"
            style={{ scaleY: scrollYProgress }}
            aria-hidden="true"
          />

          <div className="space-y-10">
            {SCHEDULE.map(({ dates, city, group }, i) => {
              const left = i % 2 === 0
              return (
                <motion.div
                  key={group}
                  className="relative grid md:grid-cols-2 gap-4 md:gap-16 items-center"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  {/* Узел на трассе */}
                  <span
                    className="absolute left-[19px] md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-[3px] border-[#1e4976] z-10 shadow"
                    aria-hidden="true"
                  />
                  <div className={`pl-12 md:pl-0 ${left ? 'md:col-start-1 md:text-right md:pr-4' : 'md:col-start-2 md:pl-4'}`}>
                    <div className="panel inline-block w-full md:w-auto md:min-w-[280px] px-7 py-5 text-left">
                      <div className="font-black text-2xl text-[#0f2847]">{city}</div>
                      <div className="text-[#1e4976] font-semibold mt-0.5">{dates}</div>
                      <div className="text-sm text-gray-500 mt-1.5">
                        Место: <span className="italic">на уточнении</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
