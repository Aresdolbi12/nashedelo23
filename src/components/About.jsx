import { Reveal, SectionNum, SectionTag, staggerGroup, staggerItem } from './shared.jsx'
import { motion } from 'framer-motion'

const BENEFITS = [
  {
    title: 'Понимание бизнеса',
    text: 'Как устроен бизнес изнутри: процессы, люди, финансы, риски.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: 'Готовый план',
    text: 'Дорожная карта действий под вашу идею — с цифрами и сроками.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
  },
  {
    title: 'Доступ к экспертам',
    text: 'Предприниматели с реальным опытом, менторы, отраслевые консультанты.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Льготы и гранты',
    text: 'Актуальная информация о субсидиях, мерах поддержки и госпрограммах.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
]

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <SectionNum className="top-8 right-0">01</SectionNum>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <Reveal className="lg:col-span-5">
            <SectionTag index="01" label="О проекте" />
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-[#0f2847] leading-[1.05] mb-8">
              Фундамент
              <br />
              для <span className="text-outline">новой</span>
              <br />
              жизни
            </h2>
            <div className="concrete-bg plate rounded-sm p-6 relative">
              <p className="text-gray-700 leading-relaxed relative z-10">
                Металл и бетон — символы силы и крепкого духа. Те же материалы становятся фундаментом
                собственного дела. Мы даём систему, опору и ясный путь — от первого шага до устойчивого
                дохода.
              </p>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal className="space-y-6 text-[17px] leading-relaxed text-gray-700">
              <p>
                <span className="font-display font-bold text-[#0f2847]">«Наше дело»</span> — практическая
                образовательная программа для ветеранов боевых действий, участников Специальной военной
                операции и их семей. Проект посвящён развитию предпринимательских навыков.
              </p>
              <p>
                Задача — дать системные знания, необходимые для самостоятельного ведения бизнеса: от
                оценки рыночных возможностей до построения устойчивой модели доходов. В основе программы —
                очные бизнес-интенсивы, вебинары и индивидуальные консультации.
              </p>
              <p>
                Программа открыта для всех: и для тех, кто только задумывается о собственном деле, и для
                действующих предпринимателей, которые хотят систематизировать знания, найти новые точки
                роста или пересмотреть текущую стратегию.
              </p>
            </Reveal>

            <div className="divider-metal my-12" />

            <Reveal>
              <h3 className="font-display font-bold text-2xl text-[#0f2847] mb-8">Что вы получите</h3>
            </Reveal>
            <motion.div
              className="grid sm:grid-cols-2 gap-4"
              variants={staggerGroup}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {BENEFITS.map(({ title, text, icon }) => (
                <motion.div key={title} variants={staggerItem} className="card card-accent p-6 rounded-sm">
                  <span className="accent-bar" />
                  <div className="card-icon w-10 h-10 metal-gradient rounded-sm flex items-center justify-center mb-4">
                    {icon}
                  </div>
                  <h4 className="font-bold text-[#0f2847] mb-2">{title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
