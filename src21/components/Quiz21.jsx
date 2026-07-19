import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const EASE = [0.23, 1, 0.32, 1]

/* Необязательный мини-квиз «Кто вы?»: подбирает personalised-маршрут по
   странице. Полностью пропускаемый, ничего не блокирует, состояния видимы
   (aria-pressed). Контент не меняется — только подсказка, куда смотреть. */
const AUDIENCES = [
  {
    key: 'veteran',
    label: 'Я ветеран / участник СВО',
    route: [
      ['Как программа переводит армейский опыт в бизнес-навыки', '#about'],
      ['Два дня практики и личная дорожная карта', '#program'],
      ['Выберите город рядом с домом', '#schedule'],
    ],
  },
  {
    key: 'family',
    label: 'Я член семьи участника',
    route: [
      ['Программа открыта для членов семей — как это работает', '#about'],
      ['Вебинары, которые можно смотреть из дома', '#program'],
      ['Частые вопросы об участии', '#faq'],
    ],
  },
  {
    key: 'business',
    label: 'У меня уже есть дело',
    route: [
      ['Что программа даёт действующим предпринимателям', '#about'],
      ['Льготы, гранты и субсидии — где о них расскажут', '#program'],
      ['Консультации с экспертами-практиками', '#speakers'],
    ],
  },
]

export default function Quiz21() {
  const [active, setActive] = useState(null)
  const current = AUDIENCES.find((a) => a.key === active)

  return (
    <section className="relative px-6 lg:px-10 pb-8 md:pb-14" aria-label="Подбор маршрута по странице">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="frame15 p-7 md:p-9"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="text-[#d9bfa8] text-[11px] font-bold uppercase tracking-[0.22em] mb-3">
            Необязательный шаг — но сэкономит время
          </div>
          <h2 className="text-[#f2ece3] font-black text-2xl md:text-3xl mb-6">Кто вы? Подскажем, куда смотреть</h2>

          <div className="flex flex-wrap gap-3" role="group" aria-label="Выберите, кто вы">
            {AUDIENCES.map(({ key, label }) => (
              <button
                key={key}
                aria-pressed={active === key}
                onClick={() => setActive(active === key ? null : key)}
                className={`px-5 py-3 rounded-full font-semibold text-sm md:text-base transition-colors cursor-pointer border ${
                  active === key
                    ? 'bg-[#d9bfa8] text-[#0d2f22] border-[#d9bfa8]'
                    : 'bg-transparent text-[#f2ece3]/85 border-[#d9bfa8]/35 hover:border-[#d9bfa8]/70'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {current && (
              <motion.ol
                key={current.key}
                className="mt-7 space-y-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                {current.route.map(([text, href], i) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="group flex items-baseline gap-4 text-[#f2ece3]/90 hover:text-white transition-colors"
                    >
                      <span className="text-[#d9bfa8] font-bold text-xs shrink-0">{i + 1}</span>
                      <span className="font-medium text-base md:text-lg underline decoration-[#d9bfa8]/40 underline-offset-4 group-hover:decoration-[#d9bfa8]">
                        {text}
                      </span>
                    </a>
                  </li>
                ))}
              </motion.ol>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
