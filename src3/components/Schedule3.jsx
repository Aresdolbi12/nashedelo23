import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SCHEDULE } from '../../src2/content.js'

const EASE = [0.19, 1, 0.22, 1]

function StationCard({ dates, city, group, index }) {
  return (
    <div className="panel w-[320px] md:w-[380px] flex-shrink-0 p-7 md:p-8">
      <div className="text-[13px] font-semibold text-[#1e4976] bg-[#a8c8dc]/25 rounded-full px-3.5 py-1 inline-block mb-5">
        Группа {group}
      </div>
      <div className="font-black text-3xl md:text-4xl text-[#0f2847] tracking-tight">{city}</div>
      <div className="text-[#1e4976] font-semibold text-lg mt-2">{dates}</div>
      <div className="text-gray-500 text-sm mt-5">Очный интенсив · 2 дня · площадка города №{index + 1} маршрута</div>
    </div>
  )
}

/* Десктоп: горизонтальная лента городов, движимая вертикальным скроллом */
function HorizontalRoute() {
  const wrapRef = useRef(null)
  const trackRef = useRef(null)
  const [shift, setShift] = useState(0)
  const { scrollYProgress } = useScroll({ target: wrapRef })

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return
      setShift(Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 80))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const x = useTransform(scrollYProgress, [0.08, 0.92], [0, -shift])

  return (
    <div ref={wrapRef} className="relative hidden md:block" style={{ height: '280vh' }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="px-10 mb-10 max-w-6xl mx-auto w-full">
          <h2 className="text-[#0f2847] font-black text-4xl md:text-6xl">Семь городов рядом с вами</h2>
          <p className="text-[#1e4976] text-lg mt-3">
            Сентябрь — октябрь · листайте вниз, чтобы проехать маршрут
          </p>
        </div>
        <motion.div ref={trackRef} style={{ x }} className="flex items-stretch gap-6 pl-10 pr-20 w-max">
          {SCHEDULE.map((s, i) => (
            <div key={s.group} className="flex items-center gap-6">
              <StationCard {...s} index={i} />
              {i < SCHEDULE.length - 1 && (
                <div className="w-16 h-px bg-[#0f2847]/25 relative flex-shrink-0" aria-hidden="true">
                  <span className="absolute right-0 -top-[3px] w-[7px] h-[7px] rounded-full bg-[#0f2847]/40" />
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

/* Мобайл: обычный вертикальный список */
function VerticalRoute() {
  return (
    <div className="md:hidden px-6 py-20">
      <h2 className="text-[#0f2847] font-black text-4xl mb-3">Семь городов рядом с вами</h2>
      <p className="text-[#1e4976] mb-10">Сентябрь — октябрь 2026</p>
      <div className="space-y-5">
        {SCHEDULE.map((s, i) => (
          <motion.div
            key={s.group}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="panel p-6">
              <div className="font-black text-2xl text-[#0f2847]">{s.city}</div>
              <div className="text-[#1e4976] font-semibold mt-1">{s.dates} · Группа {s.group}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function Schedule3() {
  return (
    <section id="schedule" className="relative">
      <HorizontalRoute />
      <VerticalRoute />
    </section>
  )
}
