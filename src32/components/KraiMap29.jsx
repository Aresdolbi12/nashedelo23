import { useState } from 'react'
import { motion } from 'framer-motion'
import { SCHEDULE } from '../content.js'

const EASE = [0.19, 1, 0.22, 1]
const OUTLINE = 'M 330 87 L 378 76 L 590 53 Q 700 100 743 178 L 794 246 Q 850 310 879 394 Q 860 480 794 543 Q 790 640 777 725 Q 720 800 624 838 Q 540 750 466 679 Q 380 625 298 577 L 249 538 Q 210 515 166 497 Q 90 470 47 429 Q 100 400 149 394 Q 210 360 268 315 L 314 235 Q 300 190 293 144 Q 310 110 330 87 Z'

/* Координаты городов на стилизованной карте (в порядке SCHEDULE) */
const COORDS = {
  'Белореченск': [602, 527],
  'Армавир': [816, 476],
  'Ейск': [335, 100],
  'Новороссийск': [249, 538],
  'Сочи': [598, 786],
  'Тимашевск': [444, 333],
  'Краснодар': [451, 467],
}

const ROUTE = SCHEDULE.map(({ city }) => COORDS[city])
const ROUTE_D = 'M ' + ROUTE.map(([x, y]) => `${x} ${y}`).join(' L ')

/* География v29: стилизованная карта края. Контур рисуется штрихом,
   затем прочерчивается маршрут программы через семь городов;
   наведение на строку города подсвечивает его точку на карте. */
export default function KraiMap29() {
  const [active, setActive] = useState(null)

  return (
    <section id="schedule" className="relative px-6 lg:px-10 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="relative text-[#f2ece3] font-black text-4xl md:text-6xl mb-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="echo-text15 absolute -top-[0.55em] left-[0.1em] text-[1.5em] font-black" aria-hidden="true">
            Край
          </span>
          <span className="relative">Обучение пройдет в семи городах Краснодарского края</span>
        </motion.h2>
        <motion.p
          className="text-[#d9bfa8] text-lg max-w-xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        >
          Возможность выбрать площадку, до которой удобно добраться
        </motion.p>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-center">
          {/* Карта */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <svg viewBox="10 20 950 850" fill="none" className="w-full h-auto" role="img" aria-label="Стилизованная карта Краснодарского края с городами программы">
              <g>
                {/* Контур края: рисуется штрихом */}
                <motion.path
                  d={OUTLINE}
                  stroke="rgba(217, 191, 168, 0.55)"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  fill="rgba(20, 58, 44, 0.35)"
                  initial={{ pathLength: 0, fillOpacity: 0 }}
                  whileInView={{ pathLength: 1, fillOpacity: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ pathLength: { duration: 2, ease: 'easeInOut' }, fillOpacity: { duration: 1, delay: 1.6 } }}
                />
                {/* Маршрут программы по датам */}
                <motion.path
                  d={ROUTE_D}
                  stroke="#e04e39"
                  strokeWidth="2.5"
                  strokeDasharray="7 7"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.85 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ pathLength: { duration: 2.2, ease: 'easeInOut', delay: 1.9 }, opacity: { duration: 0.4, delay: 1.9 } }}
                />
                {/* Города */}
                {SCHEDULE.map(({ city }, i) => {
                  const [x, y] = ROUTE[i]
                  const on = active === i
                  return (
                    <motion.g
                      key={city}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.45, ease: EASE, delay: 2 + i * 0.28 }}
                      style={{ transformOrigin: `${x}px ${y}px` }}
                    >
                      <circle cx={x} cy={y} r={on ? 15 : 9} fill={on ? '#e04e39' : '#f2e9de'} stroke="#c58b68" strokeWidth="3" style={{ transition: 'all 0.25s' }} />
                      <text
                        x={x}
                        y={y - 20}
                        textAnchor="middle"
                        fill={on ? '#f6ead8' : 'rgba(235, 220, 207, 0.75)'}
                        fontSize={on ? 30 : 24}
                        fontWeight="800"
                        style={{ fontFamily: "'Geologica', sans-serif", transition: 'all 0.25s' }}
                      >
                        {city}
                      </text>
                    </motion.g>
                  )
                })}
              </g>
            </svg>
          </motion.div>

          {/* Список городов */}
          <div>
            {SCHEDULE.map(({ dates, city, group }, i) => (
              <motion.div
                key={group}
                className={`cityrow29 flex items-baseline justify-between gap-4 border-b border-[#d9bfa8]/25 py-4 px-3 cursor-default ${
                  active === i ? 'cityrow29-on' : ''
                }`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
              >
                <span className="flex items-baseline gap-4">
                  <span className="w-2.5 h-2.5 rotate-45 border-2 border-[#c58b68] inline-block translate-y-[-1px]" aria-hidden="true" />
                  <span className="font-black text-xl md:text-2xl text-[#f2ece3]">{city}</span>
                </span>
                <span className="text-right">
                  <span className="block font-bold text-[#d9bfa8]">{dates}</span>
                  <span className="block text-xs text-[#d9bfa8]/60">место на уточнении</span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
