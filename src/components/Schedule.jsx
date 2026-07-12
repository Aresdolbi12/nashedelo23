import { motion } from 'framer-motion'
import { ArrowIcon, Reveal, SectionNum, SectionTag, staggerGroup, staggerItem } from './shared.jsx'

const ROWS = [
  { dates: '16.09 — 17.09', city: 'г. Белореченск', group: 'Группа 1' },
  { dates: '23.09 — 24.09', city: 'г. Армавир', group: 'Группа 2' },
  { dates: '30.09 — 01.10', city: 'г. Ейск', group: 'Группа 3' },
  { dates: '07.10 — 08.10', city: 'г. Новороссийск / г. Анапа', group: 'Группа 4' },
  { dates: '14.10 — 15.10', city: 'г. Сочи', group: 'Группа 5' },
  { dates: '27.10 — 28.10', city: 'г. Тимашевск', group: 'Группа 6' },
  { dates: '29.10 — 30.10', city: 'г. Краснодар', group: 'Группа 7' },
]

export default function Schedule() {
  return (
    <section
      id="schedule"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f7f9fb 0%, #e8f0f6 50%, #f7f9fb 100%)' }}
    >
      <div className="cloud" style={{ width: 500, height: 140, top: '10%', left: '-10%', opacity: 0.5, '--drift': '100s' }} aria-hidden="true" />
      <div className="cloud" style={{ width: 400, height: 110, bottom: '15%', right: '-8%', opacity: 0.45, '--drift': '85s' }} aria-hidden="true" />
      <SectionNum className="top-8 right-4">03</SectionNum>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <Reveal className="max-w-3xl mb-16">
          <SectionTag index="03" label="Расписание" />
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-[#0f2847] leading-[1.05] mb-6">
            Ближайший поток
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Очные двухдневные интенсивы проходят в семи городах Краснодарского края. Выберите удобную
            площадку и группу.
          </p>
        </Reveal>

        <Reveal className="bg-white rounded-sm border border-gray-200 overflow-hidden shadow-sm">
          <div className="grid grid-cols-12 gap-4 px-6 md:px-8 py-5 bg-[#0f2847] text-white">
            <div className="col-span-5 md:col-span-3 text-xs uppercase tracking-wider font-semibold">Даты</div>
            <div className="col-span-7 md:col-span-5 text-xs uppercase tracking-wider font-semibold">Город</div>
            <div className="hidden md:block md:col-span-4 text-xs uppercase tracking-wider font-semibold text-right">
              Группа
            </div>
          </div>
          <motion.div variants={staggerGroup} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-40px' }}>
            {ROWS.map(({ dates, city, group }) => (
              <motion.div
                key={group}
                variants={staggerItem}
                className="schedule-row grid grid-cols-12 gap-4 px-6 md:px-8 py-6 items-center"
              >
                <div className="row-date col-span-5 md:col-span-3 font-display font-bold text-[#0f2847]">{dates}</div>
                <div className="col-span-7 md:col-span-5 text-gray-800 font-medium">{city}</div>
                <div className="hidden md:flex md:col-span-4 items-center justify-end gap-3 text-sm text-gray-600">
                  {group}
                  <ArrowIcon size={16} className="row-arrow text-[#1e4976]" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
