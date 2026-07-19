import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { SPEAKER_ROLES } from '../../src2/content.js'

const EASE = [0.19, 1, 0.22, 1]

/* Карусель спикеров с перетаскиванием.
   Границы перетаскивания учитывают паддинги контейнера + запас,
   чтобы последняя карточка доезжала до края полностью. */
export default function Speakers5() {
  const viewRef = useRef(null)
  const trackRef = useRef(null)
  const [maxDrag, setMaxDrag] = useState(0)

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current || !viewRef.current) return
      const cs = getComputedStyle(viewRef.current)
      const pad = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight)
      const visible = viewRef.current.clientWidth - pad
      setMaxDrag(Math.max(0, trackRef.current.scrollWidth - visible))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <section id="speakers" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
        <motion.h2
          className="text-[#f2ece3] font-black text-4xl md:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          Спикеры
        </motion.h2>
        <motion.p
          className="text-[#d9bfa8]/80 text-sm max-w-sm md:text-right"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          ← потяните, чтобы посмотреть всех
        </motion.p>
      </div>

      <div ref={viewRef} className="px-6 lg:px-10">
        <motion.div
          ref={trackRef}
          className="drag-track flex gap-5 w-max"
          drag="x"
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.08}
          whileTap={{ cursor: 'grabbing' }}
        >
          {SPEAKER_ROLES.map((role, i) => (
            <div key={role} className="speaker-card3 w-[240px] md:w-[280px] flex-shrink-0">
              <div className="aspect-[3/4] relative flex items-end p-6" style={{ pointerEvents: 'none' }}>
                <span className="absolute top-5 right-6 text-white/25 font-black text-5xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <svg viewBox="0 0 100 100" className="absolute inset-x-0 bottom-0 w-full opacity-15" aria-hidden="true">
                  <circle cx="50" cy="34" r="16" fill="#fff" />
                  <path d="M18 100 Q 18 62 50 62 Q 82 62 82 100 Z" fill="#fff" />
                </svg>
                <div className="relative">
                  <div className="text-[#d9bfa8] text-xs font-semibold tracking-wide uppercase">{role}</div>
                  <div className="text-white font-bold text-lg mt-1">Спикер уточняется</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
