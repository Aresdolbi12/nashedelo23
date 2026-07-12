import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE, Reveal, SectionNum, SectionTag, staggerGroup, staggerItem } from './shared.jsx'

const ITEMS = [
  {
    q: 'Кто может участвовать?',
    a: 'Ветераны боевых действий, участники СВО, а также члены их семей. Возрастных ограничений нет.',
  },
  {
    q: 'Нужна ли уже готовая бизнес-идея?',
    a: 'Нет. Программа подходит как для тех, у кого есть задумка, так и для тех, кто пока только присматривается к предпринимательству.',
  },
  {
    q: 'Стоимость участия',
    a: 'Участие в программе бесплатное!',
  },
  {
    q: 'Где проходят занятия?',
    a: (
      <>
        В семи городах Краснодарского края: Белореченск, Армавир, Ейск, Новороссийск / Анапа, Сочи,
        Тимашевск, Краснодар. Участник сможет выбрать площадку, до которой удобно добраться. Очные
        интенсивы проходят в каждом из этих городов. Вебинары и консультации — в дистанционном формате,
        независимо от места проживания.{' '}
        <a href="#schedule" className="text-[#1e4976] underline hover:no-underline">
          Ознакомиться с расписанием →
        </a>
      </>
    ),
  },
  {
    q: 'Что нужно для старта?',
    a: 'Самое главное — желание и время на обучение. Все материалы и консультации предоставляются организаторами.',
  },
]

function FaqItem({ q, a, open, onToggle }) {
  return (
    <motion.div variants={staggerItem} className="bg-white rounded-sm border border-gray-200 overflow-hidden">
      <button
        className="w-full flex items-center justify-between p-6 md:p-7 text-left hover:bg-gray-50 transition cursor-pointer"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="font-display font-bold text-lg text-[#0f2847] pr-6">{q}</span>
        <motion.span
          className="flex-shrink-0 w-8 h-8 metal-gradient rounded-sm flex items-center justify-center text-white text-xl font-light"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="px-6 md:px-7 pb-7 text-gray-700 leading-relaxed">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="py-24 md:py-32 concrete-bg relative overflow-hidden">
      <SectionNum className="top-8 right-0 z-[1]">05</SectionNum>
      <div className="max-w-5xl mx-auto px-6 lg:px-10 relative z-10">
        <Reveal className="text-center mb-16">
          <SectionTag index="05" label="Вопросы" center />
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-[#0f2847] leading-[1.05]">
            Ответы на вопросы
          </h2>
        </Reveal>

        <motion.div
          className="space-y-3"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {ITEMS.map(({ q, a }, i) => (
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
