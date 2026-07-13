import { motion } from 'framer-motion'
import { SPEAKER_ROLES } from '../../src2/content.js'

const EASE = [0.19, 1, 0.22, 1]

const stamp = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } },
}

const group = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }

export default function Speakers4() {
  return (
    <section id="speakers" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <motion.h2
          className="font-poster font-bold text-4xl md:text-6xl mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stamp}
        >
          Труппа <span className="text-[color:var(--blue)]">экспертов</span>
        </motion.h2>
        <motion.p
          className="text-lg text-[color:var(--ink)]/70 max-w-xl mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stamp}
        >
          9 практиков: предприниматели, финансисты, маркетологи, юристы.
          Имена объявим на афише дополнительно.
        </motion.p>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={group}
        >
          {SPEAKER_ROLES.map((role, i) => (
            <motion.div key={role} variants={stamp} className="group">
              <div
                className={`bg-white border-[3px] border-[color:var(--ink)] transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 print-shadow ${
                  i % 3 === 1 ? 'rotate-[0.7deg]' : i % 3 === 2 ? '-rotate-[0.7deg]' : ''
                }`}
              >
                <div className="aspect-square bg-[color:var(--blue)] relative overflow-hidden flex items-center justify-center border-b-[3px] border-[color:var(--ink)]">
                  <span className="font-poster font-bold text-[5.5rem] md:text-[7rem] text-white/20 leading-none select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {/* Дуотон-силуэт до объявления состава */}
                  <svg viewBox="0 0 100 100" className="absolute inset-x-0 bottom-0 w-full opacity-25" aria-hidden="true">
                    <circle cx="50" cy="36" r="15" fill="#a8c8dc" />
                    <path d="M20 100 Q 20 64 50 64 Q 80 64 80 100 Z" fill="#a8c8dc" />
                  </svg>
                </div>
                <div className="p-4 md:p-5">
                  <div className="font-poster font-medium text-[11px] md:text-xs tracking-widest uppercase text-[color:var(--blue)]">
                    {role}
                  </div>
                  <div className="font-poster font-semibold text-lg md:text-xl mt-0.5">Спикер уточняется</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
