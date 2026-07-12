import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { EASE, Reveal, Stamp } from './shared2.jsx'
import { SCHEDULE } from '../content.js'

/* Маршрут по краю: вертикальная линия, дорисовывающаяся при скролле */
export default function Schedule2() {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 0.75', 'end 0.55'],
  })

  return (
    <section id="schedule" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <Stamp num={4} name="Маршрут потока" className="mb-10" />

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <Reveal>
            <h2 className="font-display font-black text-4xl md:text-5xl text-[color:var(--ink)] leading-[1.05]">
              Семь городов. Один маршрут.
            </h2>
          </Reveal>
          <Reveal className="max-w-md">
            <p className="text-[#2c3d55] leading-relaxed">
              Интенсивы идут по краю с сентября по октябрь. Выберите площадку, до которой
              удобно добраться.
            </p>
          </Reveal>
        </div>

        <div ref={listRef} className="relative">
          {/* Трасса маршрута */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-[color:var(--line)]" aria-hidden="true" />
          <motion.div
            className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[3px] -translate-x-[1px] bg-[color:var(--steel)] origin-top"
            style={{ scaleY: scrollYProgress }}
            aria-hidden="true"
          />

          <div className="space-y-10">
            {SCHEDULE.map(({ dates, city, group }, i) => {
              const left = i % 2 === 0
              return (
                <motion.div
                  key={group}
                  className={`relative grid md:grid-cols-2 gap-4 md:gap-16 items-center`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  {/* Узел-заклёпка на трассе */}
                  <span
                    className="absolute left-[19px] md:left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-[color:var(--paper)] border-2 border-[color:var(--steel)] z-10"
                    aria-hidden="true"
                  />
                  <div className={`pl-12 md:pl-0 ${left ? 'md:text-right md:pr-4' : 'md:order-2 md:pl-4'}`}>
                    <div className="plate chamfer-sm inline-block w-full md:w-auto md:min-w-[280px]">
                      <div className="plate-face chamfer-sm px-6 py-4">
                        <div className="font-display font-bold text-lg text-[color:var(--ink)]">{city}</div>
                        <div className="text-sm text-[color:var(--steel)] font-semibold mt-0.5">{dates}</div>
                      </div>
                    </div>
                  </div>
                  <div className={`pl-12 md:pl-0 text-sm text-gray-500 ${left ? 'md:order-2 md:pl-4' : 'md:text-right md:pr-4'}`}>
                    Группа {group} · очный интенсив, 2 дня
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
