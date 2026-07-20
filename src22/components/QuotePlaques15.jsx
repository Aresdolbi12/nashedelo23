import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { QUOTES } from '../content.js'

const EASE = [0.23, 1, 0.32, 1]

/* Якоря: табличка висит на фоне, по центру пустой полосы под секцией */
const ANCHORS = [
  { after: 'about', side: 'right' },
  { after: 'schedule', side: 'left' },
  { after: 'speakers', side: 'right' },
  { after: 'faq', side: 'left' },
]

const wordVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

/* Бежевая плашка-цитата (палитра сайта, стиль карточек «Мой Бизнес»):
   хореография в три слоя — плашка всплывает и оседает с лёгким поворотом,
   декоративная кавычка распускается, текст проявляется слово за словом
   (фирменный приём миссии). Ambient: медленный дрейф на фоне. */
export default function QuotePlaques15({ offset = 0 }) {
  const reduceMotion = useReducedMotion()
  const [tops, setTops] = useState(null)

  const picks = ANCHORS.map((_, i) => QUOTES[(offset * 3 + i) % QUOTES.length])

  useEffect(() => {
    const measure = () => {
      const next = ANCHORS.map(({ after }) => {
        const el = document.getElementById(after)
        return el ? Math.round(el.getBoundingClientRect().bottom + window.scrollY) : 0
      })
      setTops((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)
    return () => ro.disconnect()
  }, [])

  if (!tops) return null

  return (
    <div className="absolute inset-0 -z-[5] overflow-hidden pointer-events-none" aria-hidden="true">
      {ANCHORS.map(({ after, side }, i) => {
        if (!tops[i]) return null
        const left = side === 'left'
        const words = picks[i].split(' ')
        return (
          <div
            key={after}
            className={`absolute -translate-y-1/2 w-[min(440px,88vw)] ${
              left ? 'left-[max(10px,3vw)]' : 'right-[max(10px,3vw)]'
            }`}
            style={{ top: tops[i] }}
          >
            <motion.div
              initial={reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 34, scale: 0.96, rotate: left ? -1.6 : 1.6 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotate: left ? -0.5 : 0.5 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <div className={reduceMotion ? '' : 'qdrift22'}>
                <div className="qplaque22 relative px-8 py-7 sm:px-9 sm:py-8">
                  {/* Декоративная кавычка */}
                  <motion.span
                    className="block font-black leading-none text-[2.6rem] text-[#c58b68]/55 select-none"
                    style={{ fontFamily: "'Unbounded', sans-serif" }}
                    initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 8 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
                  >
                    «
                  </motion.span>
                  {/* Текст: проявляется слово за словом */}
                  <motion.p
                    className="text-[#3d3831] font-medium text-[15px] sm:text-[17px] leading-relaxed mt-1 text-balance"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.022, delayChildren: 0.35 } } }}
                  >
                    {words.map((word, wi) => (
                      <motion.span key={wi} variants={reduceMotion ? undefined : wordVariants} className="inline">
                        {word}{' '}
                      </motion.span>
                    ))}
                  </motion.p>
                  {/* Штрих-подпись */}
                  <motion.span
                    className="block h-[3px] w-9 rounded-full bg-[#c58b68]/70 mt-5 origin-left"
                    initial={reduceMotion ? { opacity: 0 } : { scaleX: 0 }}
                    whileInView={reduceMotion ? { opacity: 1 } : { scaleX: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
