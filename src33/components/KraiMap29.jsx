import { useState } from 'react'
import { motion } from 'framer-motion'
import { SCHEDULE } from '../content.js'
import { VIEWBOX, BORDER_D, ADYGEA_D, DISTRICT_DS, ROUTE_D, CITY_XY } from '../kraiGeo.js'

const EASE = [0.19, 1, 0.22, 1]
const [VB_X, VB_Y, VB_W, VB_H] = VIEWBOX.split(' ').map(Number)

/* Доля длины маршрута, на которой линия достигает города (замерено по ROUTE_D):
   город зажигается ровно в момент прохождения линии — порядок всегда совпадает */
const ROUTE_DELAY = 0.6
const ROUTE_DUR = 1.4
const ROUTE_FRAC = {
  Белореченск: 0,
  Армавир: 0.1,
  Ейск: 0.342,
  Новороссийск: 0.575,
  Сочи: 0.733,
  Тимашевск: 0.948,
  Краснодар: 1,
}
const cityDelay = (city) => ROUTE_DELAY + (ROUTE_FRAC[city] ?? 0) * ROUTE_DUR

/* География v32: точная карта Краснодарского края (geoBoundaries ADM1/ADM2).
   Реальные полигоны границы, 41 района и Адыгеи-анклава,
   города — по реальным координатам (Web Mercator),
   маршрут программы — по реальным трассам через реальные станицы
   (Ханская—Майкоп—Лабинск, Тихорецк—Павловская—Староминская,
   Каневская—Славянск—Крымск, серпантин А-147, М-4 через Горячий Ключ).
   Последовательность: рисуется граница → проявляются районы →
   прочерчивается маршрут → зажигаются города. */
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

        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-14 items-center">
          {/* Карта */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <svg
              viewBox={VIEWBOX}
              fill="none"
              className="w-full h-auto"
              role="img"
              aria-label="Карта Краснодарского края с районами и маршрутом программы по семи городам"
            >
              {/* Районы края: административные границы */}
              <motion.g
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                {DISTRICT_DS.map((dd, i) => (
                  <path
                    key={i}
                    d={dd}
                    fill="rgba(20, 58, 44, 0.42)"
                    stroke="rgba(217, 191, 168, 0.17)"
                    strokeWidth="0.5"
                    strokeLinejoin="round"
                  />
                ))}
              </motion.g>

              {/* Адыгея — анклав внутри края: пунктирная граница */}
              <motion.path
                d={ADYGEA_D}
                stroke="rgba(217, 191, 168, 0.35)"
                strokeWidth="0.7"
                strokeDasharray="3 3"
                strokeLinejoin="round"
                fill="rgba(6, 20, 14, 0.3)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: 0.4 }}
              />

              {/* Граница края: рисуется штрихом */}
              <motion.path
                d={BORDER_D}
                stroke="rgba(217, 191, 168, 0.7)"
                strokeWidth="1.1"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
              />

              {/* Маршрут программы по реальным трассам */}
              <motion.path
                d={ROUTE_D}
                stroke="#e04e39"
                strokeWidth="1.6"
                strokeDasharray="3.5 3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.9 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ pathLength: { duration: ROUTE_DUR, ease: 'linear', delay: ROUTE_DELAY }, opacity: { duration: 0.3, delay: ROUTE_DELAY } }}
              />

              {/* Города */}
              {SCHEDULE.map(({ city }, i) => {
                const [x, y] = CITY_XY[city]
                const on = active === i
                return (
                  <motion.g
                    key={city}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.45, ease: EASE, delay: cityDelay(city) }}
                    style={{ transformOrigin: `${x}px ${y}px` }}
                  >
                    <circle
                      cx={x}
                      cy={y}
                      r={on ? 7 : 4.5}
                      fill={on ? '#e04e39' : '#f2e9de'}
                      stroke="#c58b68"
                      strokeWidth="1.4"
                      style={{ transition: 'all 0.25s' }}
                    />
                  </motion.g>
                )
              })}
            </svg>
            {/* Подписи городов — HTML-слоем: реальные пиксели, читаемо на телефоне */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              {SCHEDULE.map(({ city }, i) => {
                const [x, y] = CITY_XY[city]
                return (
                  <motion.span
                    key={city}
                    className={`map33-label ${active === i ? 'map33-on' : ''}`}
                    style={{ left: `${((x - VB_X) / VB_W) * 100}%`, top: `${((y - VB_Y) / VB_H) * 100}%` }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5, delay: cityDelay(city) }}
                  >
                    {city}
                  </motion.span>
                )
              })}
            </div>
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
