import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE, Reveal, Stamp, staggerGroup, staggerItem } from './shared2.jsx'
import { FAQ } from '../content.js'

function FaqItem({ q, a, open, onToggle }) {
  return (
    <motion.div variants={staggerItem} className="plate chamfer-sm">
      <div className="plate-face chamfer-sm overflow-hidden">
        <button
          className="w-full flex items-center justify-between gap-6 px-6 py-5 text-left hover:bg-[#f6f9fc] transition-colors cursor-pointer"
          onClick={onToggle}
          aria-expanded={open}
        >
          <span className="font-display font-bold text-[17px] text-[color:var(--ink)]">{q}</span>
          {/* Чертёжный крестик-прицел */}
          <motion.svg
            width="22" height="22" viewBox="0 0 22 22"
            className="flex-shrink-0 text-[color:var(--steel)]"
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="9" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2.5 2.5" />
            <line x1="11" y1="5" x2="11" y2="17" stroke="currentColor" strokeWidth="1.8" />
            <line x1="5" y1="11" x2="17" y2="11" stroke="currentColor" strokeWidth="1.8" />
          </motion.svg>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <div className="px-6 pb-6 text-[#2c3d55] leading-relaxed border-t border-dashed border-[color:var(--line)] pt-4">
                {a}
                {q === 'Где проходят занятия?' && (
                  <>
                    {' '}
                    <a href="#schedule" className="text-[color:var(--steel)] underline hover:no-underline">
                      Смотреть маршрут →
                    </a>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function Faq2() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="py-24 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <Stamp num={6} name="Вопросы и ответы" className="mb-10" />
        <Reveal className="mb-12">
          <h2 className="font-display font-black text-4xl md:text-5xl text-[color:var(--ink)] leading-[1.05]">
            Уточняющие вопросы
          </h2>
        </Reveal>

        <motion.div
          className="space-y-3"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {FAQ.map(({ q, a }, i) => (
            <FaqItem
              key={q}
              q={q}
              a={a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
