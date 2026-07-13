import { motion } from 'framer-motion'
import { DAY1, DAY2, WEBINARS } from '../../src2/content.js'

const EASE = [0.19, 1, 0.22, 1]

const stamp = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } },
}

const group = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }

/* Столб-афиша одного дня */
function DayColumn({ num, title, items, tilt }) {
  return (
    <motion.div variants={stamp} className="bg-white border-[3px] border-[color:var(--ink)] print-shadow">
      <div
        className={`bg-[color:var(--blue)] text-white font-poster font-semibold text-xl md:text-2xl px-6 py-4 flex items-baseline gap-4 ${tilt}`}
        style={{ margin: '-3px -3px 0' }}
      >
        <span className="font-bold text-4xl md:text-5xl leading-none">{num}</span>
        {title}
      </div>
      <motion.ul className="p-6 md:p-7" variants={group}>
        {items.map((entry, i) => {
          const isBreak = entry.startsWith('—')
          return (
            <motion.li
              key={i}
              variants={stamp}
              className="py-2.5 border-b-2 border-dotted border-[color:var(--ink)]/25 last:border-0 flex gap-3"
            >
              {isBreak ? (
                <span className="text-[color:var(--ink)]/45 italic pl-7">перерыв</span>
              ) : (
                <>
                  <span className="font-poster font-semibold text-[color:var(--blue)] w-4 flex-shrink-0">▸</span>
                  <span className="leading-snug">{entry}</span>
                </>
              )}
            </motion.li>
          )
        })}
      </motion.ul>
    </motion.div>
  )
}

export default function Program4() {
  return (
    <section id="program" className="relative py-24 md:py-32 bg-[color:var(--ink)]">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <motion.h2
          className="font-poster font-bold text-4xl md:text-6xl text-[color:var(--paper)] mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stamp}
        >
          Программа <span className="text-[color:var(--sky)]">интенсива</span>
        </motion.h2>
        <motion.p
          className="text-[color:var(--paper)]/70 text-lg max-w-xl mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stamp}
        >
          Два дня очной работы над личной дорожной картой — и вебинары после.
        </motion.p>

        <motion.div
          className="grid lg:grid-cols-2 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={group}
        >
          <DayColumn num="01" title="День первый" items={DAY1} tilt="-rotate-1" />
          <DayColumn num="02" title="День второй" items={DAY2} tilt="rotate-1" />
        </motion.div>

        {/* Вебинары — плакатные ярлыки */}
        <motion.div
          className="mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={group}
        >
          <motion.h3
            variants={stamp}
            className="font-poster font-semibold text-2xl md:text-3xl text-[color:var(--paper)] mb-8"
          >
            + Вебинары после интенсива
          </motion.h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {WEBINARS.map(({ title, text }, i) => (
              <motion.div
                key={title}
                variants={stamp}
                className={`bg-[color:var(--paper)] border-[3px] border-[color:var(--ink)] p-6 ${i % 2 ? 'rotate-[0.6deg]' : '-rotate-[0.6deg]'}`}
              >
                <div className="font-poster font-medium text-xs tracking-widest uppercase bg-[color:var(--sky)]/50 inline-block px-2.5 py-1 mb-3">
                  Онлайн
                </div>
                <h4 className="font-poster font-semibold text-xl leading-tight mb-1.5">{title}</h4>
                <p className="text-[color:var(--ink)]/70 text-sm leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
