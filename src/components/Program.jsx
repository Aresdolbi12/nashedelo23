import { motion } from 'framer-motion'
import { Reveal, SectionNum, SectionTag, staggerGroup, staggerItem } from './shared.jsx'

const DAY1 = [
  'Знакомство с программой, план работы',
  'Знакомство с участниками',
  'Психология предпринимательства, введение в предпринимательскую деятельность',
  'Поиск и тестирование бизнес-идей',
  'Работа с индивидуальной дорожной картой',
  { break: true },
  'Лекция «Основы предпринимательства. Бухгалтерские аспекты»',
  'Работа с индивидуальной дорожной картой',
  { break: true },
  'Лекция «Основы предпринимательства. Юридические аспекты»',
  'Работа с индивидуальной дорожной картой',
  'Подведение итогов, заполнение дорожной карты',
]

const DAY2 = [
  'Приветствие участников',
  'Азы построения финансов в бизнесе',
  'Работа с индивидуальной дорожной картой',
  { break: true },
  'Основы маркетинга и продаж',
  'Работа с индивидуальной дорожной картой',
  { break: true },
  'Эмоциональный интеллект / методы саморегуляции',
  'Работа с индивидуальной дорожной картой',
  'Подведение итогов, заполнение дорожной карты',
]

const WEBINARS = [
  {
    title: 'Франчайзинг как способ ведения бизнеса',
    text: 'Готовые модели и франшизы: как начать с проверенной концепции.',
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

function DayCard({ num, title, items }) {
  return (
    <Reveal className="mb-8">
      <div className="card bg-white p-8 md:p-10 rounded-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="font-display font-black text-5xl leading-none bg-gradient-to-br from-[#1e4976] to-[#3d6892] bg-clip-text text-transparent">
            {num}
          </div>
          <h3 className="font-display font-bold text-2xl text-[#0f2847]">{title}</h3>
        </div>
        <motion.div
          className="grid md:grid-cols-2 gap-x-10"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {items.map((entry, i) =>
            entry.break ? (
              <motion.div key={i} variants={staggerItem} className="flex items-start gap-3 py-3 border-b border-gray-100">
                <div className="w-2 h-2 mt-2 rounded-full bg-[#a8c8dc] flex-shrink-0" />
                <span className="text-gray-500 italic">Перерыв</span>
              </motion.div>
            ) : (
              <motion.div key={i} variants={staggerItem} className="flex items-start gap-3 py-3 border-b border-gray-100">
                <div className="w-2 h-2 mt-2 rounded-full bg-[#1e4976] flex-shrink-0" />
                <span className="text-gray-700">{entry}</span>
              </motion.div>
            ),
          )}
        </motion.div>
      </div>
    </Reveal>
  )
}

export default function Program() {
  return (
    <section id="program" className="py-24 md:py-32 concrete-bg relative overflow-hidden">
      <SectionNum className="top-4 left-0 z-[1]">02</SectionNum>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <Reveal>
            <SectionTag index="02" label="Программа" />
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-[#0f2847] leading-[1.05] max-w-2xl">
              Два дня интенсива.
              <br />
              Плюс вебинары.
            </h2>
          </Reveal>
          <Reveal className="max-w-md mt-6 md:mt-0">
            <p className="text-gray-700 leading-relaxed">
              Очный двухдневный бизнес-интенсив с работой над индивидуальной дорожной картой и серия
              онлайн-вебинаров для углубления знаний.
            </p>
          </Reveal>
        </div>

        <DayCard num="01" title="День 1" items={DAY1} />
        <DayCard num="02" title="День 2" items={DAY2} />

        <Reveal>
          <div className="card bg-white p-8 md:p-10 rounded-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 metal-gradient rounded-sm flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-2xl text-[#0f2847]">Вебинары</h3>
            </div>
            <motion.div
              className="grid sm:grid-cols-2 gap-4"
              variants={staggerGroup}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
            >
              {WEBINARS.map(({ title, text }) => (
                <motion.div key={title} variants={staggerItem} className="card card-accent p-5 rounded-sm">
                  <span className="accent-bar" />
                  <h4 className="font-bold text-[#0f2847] mb-1">{title}</h4>
                  <p className="text-sm text-gray-600">{text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
