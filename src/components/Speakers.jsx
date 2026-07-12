import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { Reveal, SectionNum, SectionTag, staggerGroup, staggerItem } from './shared.jsx'

const ROLES = [
  'Предпринимательство',
  'Финансы и учёт',
  'Маркетинг и продажи',
  'Юридические аспекты',
  'Психология бизнеса',
  'Франчайзинг',
  'Государственная поддержка',
  'Кадры и трудоустройство',
  'Эмоциональный интеллект',
]

/* Карточка с лёгким 3D-наклоном за курсором */
function TiltCard({ num, role }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })

  const onMove = (e) => {
    if (reduceMotion || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * 6)
    rx.set(-py * 6)
  }

  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div variants={staggerItem} className="group">
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 800 }}
        className="speaker-img aspect-[4/5] rounded-sm mb-5 flex items-center justify-center transition-shadow duration-400 group-hover:shadow-[0_20px_40px_-15px_rgba(15,40,71,0.25)] group-hover:ring-1 group-hover:ring-[#9aa5b5]"
      >
        <div className="font-display font-black text-6xl text-white/25 leading-none relative z-10">{num}</div>
      </motion.div>
      <h3 className="font-display font-bold text-lg text-[#0f2847]">Спикер уточняется</h3>
      <p className="text-xs uppercase tracking-wider text-[#1e4976] mt-1 mb-2">{role}</p>
      <p className="text-sm text-gray-600 leading-relaxed">Информация будет дополнена.</p>
    </motion.div>
  )
}

export default function Speakers() {
  return (
    <section id="speakers" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <SectionNum className="top-8 left-0">04</SectionNum>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <Reveal>
            <SectionTag index="04" label="Спикеры" />
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-[#0f2847] leading-[1.05]">
              Те, кто строил.
              <br />
              Те, кто <span className="text-outline">знает</span>.
            </h2>
          </Reveal>
          <Reveal className="max-w-md mt-6 md:mt-0">
            <p className="text-gray-700 leading-relaxed">
              9 экспертов-практиков: предприниматели, финансисты, маркетологи, юристы. Полный состав
              спикеров будет объявлен дополнительно.
            </p>
          </Reveal>
        </div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {ROLES.map((role, i) => (
            <TiltCard key={role} num={String(i + 1).padStart(2, '0')} role={role} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
