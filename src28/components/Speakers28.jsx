import { motion } from 'framer-motion'
import { SPEAKER_ROLES } from '../../src2/content.js'

const HARD = [0.16, 1, 0.3, 1]

/* Спикеры v28: типографский список вместо карточек — роли КРУПНО,
   строка инвертируется заливкой при наведении (flood-инверсия). */
export default function Speakers28() {
  return (
    <section id="speakers" className="relative py-24 md:py-32 [overflow-x:clip]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.h2
          className="relative text-[#f2ece3] font-black uppercase leading-[0.95] text-[clamp(3rem,8vw,7rem)] mb-14"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: HARD }}
        >
          <span className="echo-text15 absolute -top-[0.55em] left-[0.1em] text-[1.5em] font-black" aria-hidden="true">
            Люди
          </span>
          <span className="relative">Спикеры</span>
        </motion.h2>

        <div className="border-t-2 border-[#d9bfa8]/40">
          {SPEAKER_ROLES.map((role, i) => (
            <motion.div
              key={role}
              className="spkrow28 group flex items-baseline justify-between gap-6 border-b-2 border-[#d9bfa8]/40 py-5 md:py-6 px-3 md:px-5"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: HARD, delay: (i % 4) * 0.05 }}
            >
              <span className="shrink-0 font-black text-sm tracking-widest text-[#c58b68] group-hover:text-[#0d2f22]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1 font-black uppercase leading-tight text-[clamp(1.15rem,3vw,2.6rem)] text-[#f2ece3] group-hover:text-[#0d2f22]">
                {role}
              </span>
              <span className="shrink-0 hidden sm:block text-sm font-semibold text-[#d9bfa8]/70 group-hover:text-[#623b2a]">
                спикер уточняется
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
