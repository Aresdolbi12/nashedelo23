import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const EASE = [0.19, 1, 0.22, 1]

const DAY1 = [
  'Лекция «Психология предпринимательства, введение в предпринимательскую деятельность»',
  'Лекция «Поиск и тестирование бизнес-идей»',
  'Лекция «Основы маркетинга и продаж»',
  'Работа с индивидуальной дорожной картой',
]

const DAY2 = [
  'Лекция «Азы построения финансов в бизнесе»',
  'Лекция «Бухгалтерия, налоги, право: как открыть свой бизнес и избежать ошибок на старте»',
  'Лекция «Управление эмоциями в бизнесе и личной жизни»',
  'Работа с индивидуальной дорожной картой',
]

const WEBINARS = [
  {
    title: 'Франчайзинг как способ ведения бизнеса',
    text: 'Готовая схема: как начать бизнес по отработанной модели.',
  },
  {
    title: 'Пассивный доход',
    text: 'Стратегии создания источников дохода, не требующих ежедневного участия.',
  },
  {
    title: 'Кадровые вопросы трудоустройства, подбор сотрудников',
    text: 'Как найти и удержать команду, оформление трудовых отношений.',
  },
  {
    title: 'Государственная поддержка субъектов МСП',
    text: 'Гранты, субсидии, льготные программы — как получить и использовать.',
  },
]

const TABS = [
  { key: 'day1', label: 'День 1' },
  { key: 'day2', label: 'День 2' },
  { key: 'webinars', label: 'Вебинары' },
]

/* Список дня с рисующимися галочками (из варианта 2, в стиле рассвета) */
function DayList({ items }) {
  return (
    <div className="grid md:grid-cols-2 gap-x-12">
      {items.map((entry, i) => {
        const isBreak = entry.startsWith('—')
        return (
          <div key={i} className="flex items-start gap-3 py-3.5 border-b border-[#0f2847]/8 last:border-0">
            {isBreak ? (
              <span className="text-gray-400 italic text-sm pl-8">перерыв</span>
            ) : (
              <>
                <svg width="19" height="19" viewBox="0 0 18 18" className="mt-0.5 flex-shrink-0" aria-hidden="true">
                  <rect x="1" y="1" width="16" height="16" rx="5" fill="none" stroke="#3d6892" strokeWidth="1.5" />
                  <motion.path
                    d="M4 9.5 L 7.5 13 L 14 5"
                    fill="none"
                    stroke="#3d6892"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.25 + i * 0.05 }}
                  />
                </svg>
                <span className="text-[#2c3d55]">{entry}</span>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}

function WebinarList() {
  return (
    <div className="grid sm:grid-cols-2 gap-x-12 gap-y-7">
      {WEBINARS.map(({ title, text }) => (
        <div key={title}>
          <div className="text-[13px] font-semibold text-[#1e4976] bg-[#a8c8dc]/25 rounded-full px-3.5 py-1 inline-block mb-3">
            онлайн
          </div>
          <h4 className="font-bold text-[#0f2847] text-lg">{title}</h4>
          <p className="text-sm text-gray-600 leading-relaxed mt-1">{text}</p>
        </div>
      ))}
    </div>
  )
}

/* Программа с табами из варианта 2, адаптированная под панели рассвета */
export default function Program5() {
  const [tab, setTab] = useState('day1')

  return (
    <section id="program" className="relative px-4 sm:px-6 lg:px-10 py-28">
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
          чтобы посмотреть на бизнес шире.
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
                  tab === key ? 'text-[#0f2847]' : 'text-white bg-white/15 hover:bg-white/25 backdrop-blur-sm'
                }`}
              >
                {tab === key && (
                  <motion.span
                    layoutId="program5-tab"
                    className="absolute inset-0 bg-white rounded-full shadow-lg"
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
                {tab === 'day1' && <DayList items={DAY1} />}
                {tab === 'day2' && <DayList items={DAY2} />}
                {tab === 'webinars' && <WebinarList />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
