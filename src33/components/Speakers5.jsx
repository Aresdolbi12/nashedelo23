import { motion } from 'framer-motion'
import { SPEAKERS } from '../content.js'

const EASE = [0.19, 1, 0.22, 1]

/* Спикеры сеткой (конструкция «Мой Бизнес Forum»: spk-grid).
   С 2026-07-22 — реальные ФИО из программы (content.js), не заглушки.
   С 2026-07-24 — реальные фото: webp 4:5 в /speakers, кадры выровнены по
   уровню глаз (~30%), objectPosition 22% держит лицо в любой пропорции
   карточки; текст читается через зелёный градиент снизу. */
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

        {/* На телефоне 1 колонка: в 2 узких (155px) текст закрывал всю
            карточку и не оставалось места под будущие фото спикеров */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {SPEAKERS.map(({ name, topic, photo, pos, tbd }, i) => (
            <motion.div
              key={name}
              className="speaker-card3"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.07 }}
            >
              <div className="aspect-[16/9] sm:aspect-[4/3] md:aspect-[3/2] relative flex items-end p-5 md:p-6 overflow-hidden rounded-[inherit]">
                {photo ? (
                  <>
                    <img
                      src={`../speakers/${photo}.webp`}
                      alt={name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ objectPosition: pos ?? '50% 12%' }}
                    />
                    {/* Градиент бренда: текст читается, лицо остаётся чистым */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#0d2f22]/95 via-[#0d2f22]/30 to-transparent"
                      aria-hidden="true"
                    />
                  </>
                ) : (
                  <svg viewBox="0 0 100 100" className="absolute inset-x-0 bottom-0 w-2/5 mx-auto opacity-15" aria-hidden="true">
                    <circle cx="50" cy="34" r="16" fill="#fff" />
                    <path d="M18 100 Q 18 62 50 62 Q 82 62 82 100 Z" fill="#fff" />
                  </svg>
                )}
                <span className="absolute top-4 right-5 text-white/35 font-black text-4xl [text-shadow:0_1px_10px_rgba(13,47,34,0.55)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="relative">
                  <div className="text-[#d9bfa8] text-[11px] md:text-xs font-semibold tracking-wide uppercase [text-shadow:0_1px_6px_rgba(13,47,34,0.8)]">
                    {topic}
                  </div>
                  <div
                    className={`font-bold text-base md:text-lg mt-1 [text-shadow:0_1px_8px_rgba(13,47,34,0.9)] ${
                      tbd ? 'text-white/60' : 'text-white'
                    }`}
                  >
                    {name}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
