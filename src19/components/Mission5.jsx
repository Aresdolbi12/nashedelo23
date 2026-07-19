import { motion } from 'framer-motion'
import { Counter } from '../../src2/components/shared2.jsx'
import { Tile, TileGrid } from './Hero19.jsx'

const MISSION_1 =
  'Проект посвящён развитию предпринимательских навыков. Задача — дать системные знания, необходимые для самостоятельного ведения бизнеса: от оценки рыночных возможностей до построения устойчивой модели доходов.'

const MISSION_2 =
  'В основе программы — очные бизнес-интенсивы, вебинары и индивидуальные консультации. Участники изучат маркетинг, финансовый учёт, взаимодействие с государственными структурами и инструменты получения поддержки.'

const RESULTS = [
  'Понимание, как устроен бизнес изнутри',
  'Готовый план действий под свою идею',
  'Консультации с опытными экспертами',
  'Информация о льготах, грантах и субсидиях',
  'Навыки управления и работы с людьми',
]

const STATS = [
  { value: 2, label: 'дня очного интенсива' },
  { value: 9, label: 'экспертов-практиков' },
  { value: 7, label: 'городов Краснодарского края' },
  { value: 100, suffix: '%', label: 'бесплатно для участников' },
]

export default function Mission5() {
  return (
    <section id="about" className="relative px-4 lg:px-8 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        <TileGrid>
          {/* Стейтмент — большой бумажный тайл */}
          <Tile className="tile19-paper col-span-12 md:col-span-8 md:row-span-2 p-8 md:p-12">
            <span className="text-[#c58b68] text-[11px] font-bold uppercase tracking-[0.22em]">О проекте</span>
            <p className="text-[#27251f] text-xl md:text-3xl font-semibold leading-snug mt-5">{MISSION_1}</p>
            <p className="text-[#4a4238] text-base md:text-xl font-medium leading-snug mt-6 max-w-2xl">{MISSION_2}</p>
            <p className="text-[#6b5f50] text-sm md:text-base leading-relaxed mt-6 max-w-xl">
              Программа открыта и для тех, кто только задумывается о своём деле, и для действующих
              предпринимателей, которые хотят систематизировать знания.
            </p>
          </Tile>

          {STATS.map(({ value, suffix, label }) => (
            <Tile key={label} className="tile19-glass col-span-6 md:col-span-4 p-6 flex flex-col justify-between min-h-[130px]">
              <div className="grad-num15 font-black text-5xl md:text-6xl tracking-tight">
                <Counter value={value} suffix={suffix} />
              </div>
              <div className="text-[#d9c9b8]/85 text-xs md:text-sm mt-3">{label}</div>
            </Tile>
          ))}

          {/* Итоги — металлический тайл-список */}
          <Tile className="tile19-metal col-span-12 md:col-span-8 p-7 md:p-9">
            <div className="font-black uppercase tracking-[0.14em] text-sm mb-4">Что вы получите в итоге</div>
            <div>
              {RESULTS.map((item, i) => (
                <div key={item} className="flex items-baseline gap-4 py-2.5 border-t border-[rgba(58,70,84,0.25)] first:border-t-0">
                  <span className="text-[#623b2a] font-bold text-xs" style={{ fontFamily: "'Unbounded', sans-serif" }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-semibold text-sm md:text-lg">{item}</span>
                </div>
              ))}
            </div>
          </Tile>
        </TileGrid>
      </div>
    </section>
  )
}
