import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { DAY1, DAY2, WEBINARS } from '../content.js'

const EASE = [0.19, 1, 0.22, 1]

const TABS = [
  { key: 'day1', label: 'День 1' },
  { key: 'day2', label: 'День 2' },
  { key: 'webinars', label: 'Вебинары' },
]

/* Попап лекции: фото спикера (плейсхолдер — фотографии добавит заказчик),
   ФИО и список результатов. Стиль — белая панель рассвета. */
function LectureModal({ lecture, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Подложка */}
      <div
        className="absolute inset-0 bg-[#0d2f22]/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={lecture.title}
        className="panel relative w-full max-w-2xl max-h-[85vh] overflow-y-auto p-7 md:p-10"
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-4 right-4 w-10 h-10 rounded-full border border-[#27251f]/15 flex items-center justify-center text-[#27251f] hover:bg-[#c58b68]/20 transition cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="1" y1="1" x2="13" y2="13" />
            <line x1="13" y1="1" x2="1" y2="13" />
          </svg>
        </button>

        <div className="text-[13px] font-semibold text-[#623b2a] bg-[#c58b68]/25 rounded-full px-3.5 py-1 inline-block mb-5">
          {lecture.kind}
        </div>

        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {/* Фото спикера: плейсхолдер до передачи реальных фотографий */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-[#d9bfa8]/60 to-[#623b2a]/25 flex items-center justify-center flex-shrink-0 border border-[#27251f]/10">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#623b2a" strokeWidth="1.5" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
            </svg>
          </div>
          <div>
            <h3 className="font-black text-[#27251f] text-xl md:text-2xl leading-snug">{lecture.title}</h3>
            <p className="text-[#623b2a] font-semibold mt-2">
              Спикер:{' '}
              <span className={lecture.speaker.includes('уточн') ? 'text-gray-500 italic font-normal' : ''}>
                {lecture.speaker}
              </span>
            </p>
          </div>
        </div>

        {lecture.points.length === 0 && (
          <p className="mt-7 text-gray-500 italic leading-relaxed">
            Подробная программа лекции уточняется.
          </p>
        )}
        <ul className="mt-7 space-y-3.5">
          {lecture.points.map((p, i) => (
            <li key={i} className="flex items-start gap-3">
              <svg width="19" height="19" viewBox="0 0 18 18" className="mt-1 flex-shrink-0" aria-hidden="true">
                <rect x="1" y="1" width="16" height="16" rx="5" fill="none" stroke="#7a4f38" strokeWidth="1.5" />
                <motion.path
                  d="M4 9.5 L 7.5 13 L 14 5"
                  fill="none"
                  stroke="#7a4f38"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.2 + i * 0.07 }}
                />
              </svg>
              <span className="text-[#3d3831] leading-relaxed">{p}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}

/* День программы — та же сетка и типографика, что у вебинаров:
   пилюля-тип, жирный заголовок, подпись. Заголовки кликабельны → попап. */
function DayList({ items, onOpen }) {
  return (
    <div className="grid sm:grid-cols-2 gap-x-12 gap-y-7">
      {items.map((lecture) => (
        <div key={lecture.title}>
          <div className="text-[13px] font-semibold text-[#623b2a] bg-[#c58b68]/25 rounded-full px-3.5 py-1 inline-block mb-3">
            {lecture.kind}
          </div>
          <h4>
            <button
              onClick={() => onOpen(lecture)}
              className="text-left font-bold text-[#27251f] text-lg leading-snug cursor-pointer hover:text-[#623b2a] transition-colors underline decoration-[#c58b68] decoration-2 underline-offset-4 hover:decoration-[#623b2a]"
            >
              {lecture.title}
            </button>
          </h4>
        </div>
      ))}
    </div>
  )
}

/* Программа с табами из варианта 2, адаптированная под панели рассвета */
export default function Program5() {
  const [tab, setTab] = useState('day1')
  const [lecture, setLecture] = useState(null)

  return (
    <section id="program" className="relative px-4 sm:px-6 lg:px-10 py-24 md:py-32">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-white font-black text-4xl md:text-6xl mb-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          Программа
        </motion.h2>
        <motion.p
          className="text-white/75 text-lg max-w-xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        >
          Два насыщенных дня с работой над личной дорожной картой — и вебинары,
          чтобы посмотреть на бизнес шире. Нажмите на тему, чтобы узнать подробности.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          {/* Табы-пилюли */}
          <div className="flex flex-wrap gap-2 mb-5" role="tablist" aria-label="Разделы программы">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                role="tab"
                aria-selected={tab === key}
                onClick={() => setTab(key)}
                className={`relative rounded-full px-7 py-3 font-bold text-sm md:text-base transition-colors cursor-pointer ${
                  tab === key ? 'text-[#0d2f22]' : 'text-[#f2ece3] bg-[#d9bfa8]/15 hover:bg-[#d9bfa8]/25 backdrop-blur-sm'
                }`}
              >
                {tab === key && (
                  <motion.span
                    layoutId="program5-tab"
                    className="absolute inset-0 bg-[#f2e9de] rounded-full shadow-lg"
                    transition={{ duration: 0.45, ease: EASE }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </div>

          <div className="panel p-7 md:p-10 min-h-[340px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                {tab === 'day1' && <DayList items={DAY1} onOpen={setLecture} />}
                {tab === 'day2' && <DayList items={DAY2} onOpen={setLecture} />}
                {tab === 'webinars' && <DayList items={WEBINARS} onOpen={setLecture} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {lecture && <LectureModal lecture={lecture} onClose={() => setLecture(null)} />}
      </AnimatePresence>
    </section>
  )
}
