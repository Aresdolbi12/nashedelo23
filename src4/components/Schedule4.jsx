import { motion } from 'framer-motion'
import { ArrowIcon } from '../../src2/components/shared2.jsx'
import { SCHEDULE } from '../../src2/content.js'

const EASE = [0.19, 1, 0.22, 1]

const stamp = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } },
}

const group = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }

/* Расписание как театральная афиша: строки-инверсии */
export default function Schedule4() {
  return (
    <section id="schedule" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <motion.div
          className="flex flex-wrap items-end justify-between gap-6 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stamp}
        >
          <h2 className="font-poster font-bold text-4xl md:text-6xl">Афиша потока</h2>
          <div className="font-poster font-medium text-lg bg-[color:var(--ink)] text-[color:var(--paper)] px-4 py-1.5 -rotate-1">
            сентябрь — октябрь 2026
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={group}
        >
          {SCHEDULE.map(({ dates, city, group: g }) => (
            <motion.div
              key={g}
              variants={stamp}
              className="bill-row grid grid-cols-[auto_1fr_auto] md:grid-cols-[90px_1fr_auto_auto] items-center gap-x-5 md:gap-x-10 px-3 md:px-6 py-5 md:py-6"
            >
              <div className="bill-num font-poster font-bold text-3xl md:text-5xl text-[color:var(--blue)]">
                {String(g).padStart(2, '0')}
              </div>
              <div className="bill-city font-poster font-semibold text-2xl md:text-4xl uppercase leading-none">
                {city}
              </div>
              <div className="bill-dates font-poster font-medium text-lg md:text-2xl text-[color:var(--ink)]/70 col-start-2 md:col-start-auto">
                {dates}
              </div>
              <div className="bill-arrow hidden md:block text-white">
                <ArrowIcon size={30} strokeWidth={3} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="mt-8 text-[color:var(--ink)]/60"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stamp}
        >
          Выбирайте город, до которого удобно добраться, — очный интенсив идёт в каждом.
          Вебинары и консультации — дистанционно из любой точки.
        </motion.p>
      </div>
    </section>
  )
}
