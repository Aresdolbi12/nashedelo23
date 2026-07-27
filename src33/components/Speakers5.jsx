import { motion } from 'framer-motion'
import { SPEAKERS } from '../content.js'

const EASE = [0.19, 1, 0.22, 1]

/* Спикеры сеткой (конструкция «Мой Бизнес Forum»: spk-grid).
   С 2026-07-22 — реальные ФИО из программы (content.js), не заглушки.
   С 2026-07-24 — реальные фото: webp 4:5 в /speakers. С 27.07 кадры не
   ручные, а считаются от рамки лица (детектор, см. gen-speakers.mjs): лицо
   по центру, глаза на 35% высоты. Карточки ТОЖЕ 4:5 — портрет целиком,
   без обрезки в горизонтальную плитку (обрезка давала «лбы и макушки»);
   текст читается через зелёный градиент снизу. */
export default function Speakers5() {
  return (
    <section id="speakers" className="relative py-24 md:py-32">
      {/* Шире остальных секций: восемь портретов на десктопе иначе жмутся
          в узкой колонке, а по краям остаётся много пустого места (24.07) */}
      <div className="max-w-6xl lg:max-w-[82rem] mx-auto px-6 lg:px-10">
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

        {/* 8 спикеров: 2 колонки на телефоне, 4 на десктопе — ровно 2 ряда.
            Пропорция карточки = пропорции фото (4:5): снимок целиком, чистый,
            без плашек — ФИО и тема подписью ПОД карточкой (правка 24.07) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-7 md:gap-x-5 md:gap-y-9">
          {SPEAKERS.map(({ name, topic, photo, tbd }, i) => (
            <motion.div
              key={name}
              className="group"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: EASE, delay: (i % 4) * 0.07 }}
            >
              <div className="speaker-card3 aspect-[4/5] relative overflow-hidden">
                {photo ? (
                  <img
                    src={`../speakers/${photo}.webp?v=4`}
                    alt={name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                  />
                ) : (
                  <svg viewBox="0 0 100 100" className="absolute inset-x-0 bottom-0 w-2/5 mx-auto opacity-15" aria-hidden="true">
                    <circle cx="50" cy="34" r="16" fill="#fff" />
                    <path d="M18 100 Q 18 62 50 62 Q 82 62 82 100 Z" fill="#fff" />
                  </svg>
                )}
              </div>
              {/* Подпись под фото: тема бежевой строкой-кикером, ФИО крупно */}
              <div className="pt-3 md:pt-4 px-0.5">
                <div className="text-[#d9bfa8] text-[10px] md:text-xs font-semibold tracking-[0.14em] uppercase">
                  {topic}
                </div>
                <div className={`font-bold text-sm md:text-lg mt-1 leading-snug ${tbd ? 'text-white/60' : 'text-white'}`}>
                  {name}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
