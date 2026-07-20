import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { QUOTES } from '../content.js'

const EASE = [0.16, 1, 0.3, 1]
const ANCHORS = [
  { after: 'about', q: 3 },
  { after: 'schedule', q: 4 },
  { after: 'speakers', q: 5 },
  { after: 'faq', q: 6 },
]

function useAnchorTops() {
  const [tops, setTops] = useState(null)
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
  return tops
}

const wordVariants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: EASE } },
}

/* Цитаты v23 «Сборка по буквам»: никакой карточки — чистая крупная
   типографика по центру пустой полосы. Слова собираются каскадом,
   как буквы логотипа, затем по строке катится волна блеска. */
export default function Quotes23() {
  const reduceMotion = useReducedMotion()
  const tops = useAnchorTops()
  if (!tops) return null

  return (
    <div className="absolute inset-0 -z-[5] overflow-hidden pointer-events-none" aria-hidden="true">
      {ANCHORS.map(({ after, q }, i) => {
        if (!tops[i]) return null
        const words = QUOTES[q].split(' ')
        return (
          <div
            key={after}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(640px,90vw)] text-center"
            style={{ top: tops[i] }}
          >
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }}>
              <motion.span
                className="block font-black leading-none text-[clamp(2.6rem,4.5vw,3.8rem)] text-[#c58b68]/70 select-none"
                style={{ fontFamily: "'Unbounded', sans-serif" }}
                variants={reduceMotion ? undefined : {
                  hidden: { opacity: 0, y: -26, filter: 'blur(8px)' },
                  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: EASE } },
                }}
              >
                «
              </motion.span>
              <motion.p
                className="text-[#ebdccf]/95 font-light text-[clamp(1.15rem,1.7vw,1.55rem)] leading-relaxed mt-4 text-balance"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.3 } } }}
              >
                {words.map((word, wi) => (
                  <motion.span key={wi} variants={reduceMotion ? undefined : wordVariants} className="inline-block">
                    <span className="qword23-w inline-block" style={{ '--ld': `${wi * 0.16}s` }}>
                      {word}
                    </span>
                    {' '}
                  </motion.span>
                ))}
              </motion.p>
              <motion.span
                className="block h-px w-24 mx-auto mt-6 bg-[#d9bfa8]/35 origin-center"
                variants={reduceMotion ? undefined : {
                  hidden: { scaleX: 0, opacity: 0 },
                  visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8, ease: EASE, delay: 0.6 } },
                }}
              />
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
