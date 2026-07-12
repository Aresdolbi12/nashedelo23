import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE, Reveal, Stamp, staggerGroup, staggerItem } from './shared2.jsx'
import { DAY1, DAY2, WEBINARS } from '../content.js'

const TABS = [
  { key: 'day1', label: 'День 1' },
  { key: 'day2', label: 'День 2' },
  { key: 'webinars', label: 'Вебинары' },
]

function DayList({ items }) {
  return (
    <motion.div
      className="grid md:grid-cols-2 gap-x-12"
      variants={staggerGroup}
      initial="hidden"
      animate="visible"
    >
      {items.map((entry, i) => {
        const isBreak = entry.startsWith('—')
        return (
          <motion.div
            key={i}
            variants={staggerItem}
            className="flex items-start gap-3 py-3.5 border-b border-dashed border-[color:var(--line)]"
          >
            {isBreak ? (
              <span className="text-gray-400 italic text-sm pl-8">перерыв</span>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 18 18" className="mt-0.5 flex-shrink-0" aria-hidden="true">
                  <rect x="1" y="1" width="16" height="16" fill="none" stroke="var(--steel)" strokeWidth="1.5" />
                  <motion.path
                    d="M4 9.5 L 7.5 13 L 14 5"
                    fill="none"
                    stroke="var(--steel)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.3 + i * 0.06 }}
                  />
                </svg>
                <span className="text-[#2c3d55]">{entry}</span>
              </>
            )}
          </motion.div>
        )
      })}
    </motion.div>
  )
}

function WebinarList() {
  return (
    <motion.div className="grid sm:grid-cols-2 gap-5" variants={staggerGroup} initial="hidden" animate="visible">
      {WEBINARS.map(({ title, text }) => (
        <motion.div key={title} variants={staggerItem} className="plate chamfer-sm">
          <div className="plate-face chamfer-sm p-5">
            <div className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[color:var(--steel)] font-semibold mb-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="1" />
              </svg>
              онлайн
            </div>
            <h4 className="font-bold text-[color:var(--ink)] mb-1">{title}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default function Program2() {
  const [tab, setTab] = useState('day1')

  return (
    <section id="program" className="py-24 md:py-32 blueprint relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Stamp num={3} name="Программа" className="mb-10" />

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <Reveal>
            <h2 className="font-display font-black text-4xl md:text-5xl text-[color:var(--ink)] leading-[1.05] max-w-xl">
              Два дня по плану. Плюс вебинары.
            </h2>
          </Reveal>
          <Reveal className="max-w-md">
            <p className="text-[#2c3d55] leading-relaxed">
              Очный двухдневный интенсив с работой над индивидуальной дорожной картой и серия
              онлайн-вебинаров для углубления знаний.
            </p>
          </Reveal>
        </div>

        <Reveal>
          {/* Табы-пластины */}
          <div className="flex flex-wrap gap-2 mb-0" role="tablist" aria-label="Разделы программы">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                role="tab"
                aria-selected={tab === key}
                onClick={() => setTab(key)}
                className={`relative chamfer-sm px-6 py-3.5 font-display font-bold text-sm tracking-wide uppercase transition-colors ${
                  tab === key ? 'text-white' : 'text-[color:var(--ink)] bg-white/70 hover:bg-white'
                }`}
              >
                {tab === key && (
                  <motion.span
                    layoutId="program-tab"
                    className="absolute inset-0 steel-band chamfer-sm"
                    transition={{ duration: 0.45, ease: EASE }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </div>

          <div className="plate chamfer mt-4">
            <div className="plate-face chamfer p-8 md:p-10 min-h-[320px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  {tab === 'day1' && <DayList items={DAY1} />}
                  {tab === 'day2' && <DayList items={DAY2} />}
                  {tab === 'webinars' && <WebinarList />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
