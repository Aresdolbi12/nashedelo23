import { useLayoutEffect, useRef, useState, useEffect } from 'react'
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

/* Телефон/десктоп для радиусов точек (толщины линий — в v33.css через media) */
function useMobile() {
  const [mob, setMob] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const f = () => setMob(mq.matches)
    f()
    mq.addEventListener('change', f)
    return () => mq.removeEventListener('change', f)
  }, [])
  return mob
}

/* География v32: точная карта Краснодарского края (geoBoundaries ADM1/ADM2).

   ЖЕЛЕЗНЫЕ ПРАВИЛА ЭТОГО КОМПОНЕНТА (выстраданы на реальном iPhone):
   - внутри <svg> НЕТ framer-элементов: whileInView/pathLength на SVG-детях
     в WebKit молча не срабатывают — всё управляется одним состоянием run
     с onViewportEnter HTML-обёртки (это работает везде);
   - линии рисуются техникой getTotalLength() + stroke-dashoffset;
   - пунктир маршрута открывается маской, оффсет маски двигает rAF-цикл
     из JS (CSS-transition внутри <mask> WebKit не перерисовывает),
     по завершении маска СНИМАЕТСЯ — конечное состояние от неё не зависит;
   - появления (районы, Адыгея, маршрут, города) — чистые CSS-transition
     по классу .km-run на svg, задержки в CSS/inline. */
export default function KraiMap29() {
  const [active, setActive] = useState(null)
  const [run, setRun] = useState(false)
  const mob = useMobile()

  const borderRef = useRef(null)
  const routeMaskRef = useRef(null)
  const routeRef = useRef(null)

  /* До старта: линии спрятаны собственным штрихом (offset = длина) */
  useLayoutEffect(() => {
    for (const ref of [borderRef, routeMaskRef]) {
      const el = ref.current
      if (!el) continue
      const L = el.getTotalLength()
      el.style.strokeDasharray = L
      el.style.strokeDashoffset = L
    }
  }, [])

  useEffect(() => {
    if (!run) return
    const border = borderRef.current
    const maskEl = routeMaskRef.current
    const route = routeRef.current
    const finish = () => {
      if (border) border.style.strokeDashoffset = 0
      if (maskEl) maskEl.style.strokeDashoffset = 0
      /* снимаем маску: полный пунктир виден безусловно, что бы ни думал
         браузер про анимации внутри <mask> */
      if (route) route.removeAttribute('mask')
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish()
      return
    }
    if (border) {
      border.getBoundingClientRect()
      border.style.transition = 'stroke-dashoffset 0.9s ease-in-out'
      border.style.strokeDashoffset = 0
    }
    const L = maskEl ? parseFloat(maskEl.style.strokeDasharray) || 0 : 0
    let raf
    const t0 = performance.now()
    const tick = (now) => {
      const t = (now - t0) / 1000 - ROUTE_DELAY
      const p = Math.min(Math.max(t / ROUTE_DUR, 0), 1)
      if (maskEl) maskEl.style.strokeDashoffset = L * (1 - p)
      if (p < 1) raf = requestAnimationFrame(tick)
      else finish()
    }
    raf = requestAnimationFrame(tick)
    /* страховка на случай остановки rAF (фоновая вкладка и т.п.) */
    const safety = setTimeout(finish, (ROUTE_DELAY + ROUTE_DUR + 1) * 1000)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(safety)
    }
  }, [run])

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
            onViewportEnter={() => setRun(true)}
          >
            <svg
              viewBox={VIEWBOX}
              fill="none"
              className={`w-full h-auto ${run ? 'km-run' : ''}`}
              role="img"
              aria-label="Карта Краснодарского края с районами и маршрутом программы по семи городам"
            >
              <defs>
                <mask id="km-route-mask" maskUnits="userSpaceOnUse">
                  <path
                    ref={routeMaskRef}
                    d={ROUTE_D}
                    stroke="#fff"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </mask>
              </defs>

              {/* Районы края: административные границы */}
              <g className="km-fade km-districts">
                {DISTRICT_DS.map((dd, i) => (
                  <path
                    key={i}
                    d={dd}
                    className="km-district"
                    fill="rgba(20, 58, 44, 0.42)"
                    stroke="rgba(217, 191, 168, 0.2)"
                    strokeLinejoin="round"
                  />
                ))}
              </g>

              {/* Адыгея — анклав внутри края: пунктирная граница */}
              <path
                d={ADYGEA_D}
                className="km-adygea km-fade"
                stroke="rgba(217, 191, 168, 0.35)"
                strokeLinejoin="round"
                fill="rgba(6, 20, 14, 0.3)"
              />

              {/* Граница края: рисуется штрихом (dashoffset в юнитах пути) */}
              <path
                ref={borderRef}
                d={BORDER_D}
                className="km-border"
                stroke="rgba(217, 191, 168, 0.75)"
                strokeLinejoin="round"
              />

              {/* Маршрут: статичный пунктир, открывается маской (rAF), в конце маска снимается */}
              <path
                ref={routeRef}
                d={ROUTE_D}
                className="km-route km-fade"
                stroke="#e04e39"
                strokeLinecap="round"
                strokeLinejoin="round"
                mask="url(#km-route-mask)"
              />

              {/* Города: чистый CSS transition, задержка = момент прохождения линии */}
              {SCHEDULE.map(({ city }, i) => {
                const [x, y] = CITY_XY[city]
                const on = active === i
                return (
                  <circle
                    key={city}
                    className="km-city"
                    style={{ transitionDelay: run ? `${cityDelay(city)}s` : '0s' }}
                    cx={x}
                    cy={y}
                    r={on ? (mob ? 13 : 9) : mob ? 10 : 6}
                    fill={on ? '#e04e39' : '#f2e9de'}
                    stroke="#c58b68"
                    strokeWidth={mob ? 2.4 : 1.6}
                  />
                )
              })}
            </svg>
            {/* Подписи городов — HTML-слоем: реальные пиксели, читаемо на телефоне */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              {SCHEDULE.map(({ city }) => {
                const [x, y] = CITY_XY[city]
                return (
                  <span
                    key={city}
                    className={`map33-label km-label ${run ? 'km-label-on' : ''} ${
                      active === SCHEDULE.findIndex((s) => s.city === city) ? 'map33-on' : ''
                    }`}
                    style={{
                      left: `${((x - VB_X) / VB_W) * 100}%`,
                      top: `${((y - VB_Y) / VB_H) * 100}%`,
                      transitionDelay: run ? `${cityDelay(city)}s` : '0s',
                    }}
                  >
                    {city}
                  </span>
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
