import { motion } from 'framer-motion'
import { SPEAKER_ROLES } from '../../src2/content.js'
import { Tile, TileGrid } from './Hero19.jsx'

const EASE = [0.23, 1, 0.32, 1]

export default function Speakers5() {
  return (
    <section id="speakers" className="relative px-4 lg:px-8 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-[#f2ece3] font-black text-4xl md:text-6xl mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          Спикеры
        </motion.h2>
        <TileGrid>
          {SPEAKER_ROLES.map((role, i) => (
            <Tile
              key={role}
              className="tile19-glass col-span-6 md:col-span-4 p-6 flex flex-col justify-between min-h-[150px]"
            >
              <span className="text-[#f2ece3]/25 font-black text-4xl" style={{ fontFamily: "'Unbounded', sans-serif" }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <div className="text-[#d9bfa8] text-[11px] font-semibold tracking-wide uppercase">{role}</div>
                <div className="text-[#f2ece3] font-bold text-base md:text-lg mt-1">Спикер уточняется</div>
              </div>
            </Tile>
          ))}
        </TileGrid>
      </div>
    </section>
  )
}
