import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FAQ } from '../content.js'

const EASE = [0.19, 1, 0.22, 1]

export default function Faq5() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="faq" className="relative px-4 sm:px-6 lg:px-10 py-24 md:py-32">
      <div className="max-w-4xl mx-auto panel p-7 md:p-12">
        <h2 className="text-[#27251f] font-black uppercase leading-[0.95] text-[clamp(2.4rem,5.5vw,4.6rem)] mb-10">Частые вопросы</h2>

        <div>
          {FAQ.map(({ q, a }, i) => {
            const open = openIndex === i
            return (
              <div key={q} className="hairline">
                <button
                  className="w-full flex items-center justify-between gap-6 py-6 text-left cursor-pointer group"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                >
                  <span className="font-bold text-lg md:text-xl text-[#27251f] group-hover:text-[#623b2a] transition-colors">
                    {q}
                  </span>
                  <motion.span
                    className="w-9 h-9 rounded-full border border-[#27251f]/25 flex items-center justify-center text-[#27251f] flex-shrink-0"
                    animate={{ rotate: open ? 45 : 0, backgroundColor: open ? 'rgba(197,139,104,0.25)' : 'rgba(0,0,0,0)' }}
                    transition={{ duration: 0.35, ease: EASE }}
                    aria-hidden="true"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2">
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
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="pb-7 pr-14 text-[#3d3831] leading-relaxed">
                        {a}
                        {q === 'Где проходят занятия?' && (
                          <>
                            {' '}
                            <a href="#schedule" className="text-[#623b2a] underline hover:no-underline">
                              Смотреть города →
                            </a>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
