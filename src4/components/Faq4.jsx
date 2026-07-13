import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FAQ } from '../../src2/content.js'

const EASE = [0.19, 1, 0.22, 1]

const stamp = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } },
}

const group = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }

export default function Faq4() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-5 lg:px-10">
        <motion.h2
          className="font-poster font-bold text-4xl md:text-6xl mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stamp}
        >
          Вопрос — <span className="bg-[color:var(--ink)] text-[color:var(--paper)] px-3 inline-block rotate-1">ответ</span>
        </motion.h2>

        <motion.div
          className="space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={group}
        >
          {FAQ.map(({ q, a }, i) => {
            const open = openIndex === i
            return (
              <motion.div key={q} variants={stamp} className="bg-white border-[3px] border-[color:var(--ink)]">
                <button
                  className={`w-full flex items-center justify-between gap-5 px-6 py-5 text-left cursor-pointer transition-colors ${
                    open ? 'bg-[color:var(--blue)] text-white' : 'hover:bg-[color:var(--ink)]/5'
                  }`}
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                >
                  <span className="font-poster font-semibold text-xl md:text-2xl leading-tight">{q}</span>
                  <motion.span
                    className={`w-10 h-10 border-[3px] flex-shrink-0 flex items-center justify-center ${
                      open ? 'border-white text-white' : 'border-[color:var(--ink)] text-[color:var(--ink)]'
                    }`}
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    aria-hidden="true"
                  >
                    <svg width="16" height="16" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="3">
                      <line x1="7" y1="0" x2="7" y2="14" />
                      <line x1="0" y1="7" x2="14" y2="7" />
                    </svg>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-6 text-lg leading-relaxed border-t-[3px] border-[color:var(--ink)]">
                        {a}
                        {q === 'Где проходят занятия?' && (
                          <>
                            {' '}
                            <a href="#schedule" className="text-[color:var(--blue)] underline font-semibold hover:no-underline">
                              Смотреть афишу →
                            </a>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
