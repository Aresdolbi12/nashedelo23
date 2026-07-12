import { motion } from 'framer-motion'
import { Reveal, Rivets, Stamp, staggerGroup, staggerItem } from './shared2.jsx'
import { SPEAKER_ROLES } from '../content.js'

export default function Speakers2() {
  return (
    <section id="speakers" className="py-24 md:py-32 blueprint relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Stamp num={5} name="Спикеры" className="mb-10" />

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <Reveal>
            <h2 className="font-display font-black text-4xl md:text-5xl text-[color:var(--ink)] leading-[1.05] max-w-xl">
              Инженеры своего дела
            </h2>
          </Reveal>
          <Reveal className="max-w-md">
            <p className="text-[#2c3d55] leading-relaxed">
              9 экспертов-практиков: предприниматели, финансисты, маркетологи, юристы.
              Полный состав будет объявлен дополнительно.
            </p>
          </Reveal>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-5"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {SPEAKER_ROLES.map((role, i) => (
            <motion.div key={role} variants={staggerItem} className="group">
              <div className="plate chamfer transition-transform duration-400 group-hover:-translate-y-1.5">
                <div className="plate-face chamfer relative sheen">
                  <Rivets />
                  <div className="concrete aspect-[4/3] flex items-center justify-center relative">
                    <span className="font-display font-black text-6xl md:text-7xl text-[#0f2847]/12 select-none relative z-10">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="px-5 py-4 bg-white relative">
                    <div className="text-[11px] tracking-[0.15em] uppercase text-[color:var(--steel)] font-semibold">
                      {role}
                    </div>
                    <div className="font-bold text-[color:var(--ink)] mt-1">Спикер уточняется</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
