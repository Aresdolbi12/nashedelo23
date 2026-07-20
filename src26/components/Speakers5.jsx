import { motion } from 'framer-motion'
import { SPEAKER_ROLES } from '../../src2/content.js'

const EASE = [0.19, 1, 0.22, 1]

/* Спикеры сеткой (конструкция «Мой Бизнес Forum»: spk-grid),
   карточки — наши, из карусели v15 */
export default function Speakers5() {
  return (
    <section id="speakers" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.h2
          className="relative text-[#f2ece3] font-black text-4xl md:text-6xl mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="echo-text15 absolute -top-[0.55em] left-[0.1em] text-[1.5em] font-black" aria-hidden="true">
            Люди
          </span>
          <span className="relative">Спикеры</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {SPEAKER_ROLES.map((role, i) => (
            <motion.div
              key={role}
              className="speaker-card3 poster26"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.07 }}
            >
              <div className="aspect-[4/3] md:aspect-[3/2] relative flex items-end p-5 md:p-6">
                <span className="absolute top-4 right-5 text-white/25 font-black text-4xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <svg viewBox="0 0 100 100" className="absolute inset-x-0 bottom-0 w-2/5 mx-auto opacity-15" aria-hidden="true">
                  <circle cx="50" cy="34" r="16" fill="#fff" />
                  <path d="M18 100 Q 18 62 50 62 Q 82 62 82 100 Z" fill="#fff" />
                </svg>
                <div className="relative">
                  <div className="text-[#d9bfa8] text-[11px] md:text-xs font-semibold tracking-wide uppercase">{role}</div>
                  <div className="text-white font-bold text-base md:text-lg mt-1">Спикер уточняется</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
