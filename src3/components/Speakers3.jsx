import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { SPEAKER_ROLES } from '../../src2/content.js'

const EASE = [0.19, 1, 0.22, 1]

/* Карусель спикеров: перетаскивается мышью/пальцем */
export default function Speakers3() {
  const viewRef = useRef(null)
  const trackRef = useRef(null)
  const [maxDrag, setMaxDrag] = useState(0)

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current || !viewRef.current) return
      setMaxDrag(Math.max(0, trackRef.current.scrollWidth - viewRef.current.clientWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <section id="speakers" className="relative py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
        <motion.h2
          className="text-[#0f2847] font-black text-4xl md:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          Спикеры
        </motion.h2>
        <motion.p
          className="text-[#1e4976] max-w-sm md:text-right"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          9 практиков. Состав объявим дополнительно.
          <span className="block text-[#1e4976]/60 text-sm mt-1">← потяните, чтобы посмотреть всех</span>
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
                {/* Силуэт-плейсхолдер до объявления состава */}
                <svg viewBox="0 0 100 100" className="absolute inset-x-0 bottom-0 w-full opacity-15" aria-hidden="true">
                  <circle cx="50" cy="34" r="16" fill="#fff" />
                  <path d="M18 100 Q 18 62 50 62 Q 82 62 82 100 Z" fill="#fff" />
                </svg>
                <div className="relative">
                  <div className="text-[#a8c8dc] text-xs font-semibold tracking-wide uppercase">{role}</div>
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
