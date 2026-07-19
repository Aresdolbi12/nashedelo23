import { motion } from 'framer-motion'
import { SCHEDULE } from '../content.js'
import { Tile, TileGrid } from './Hero19.jsx'

const EASE = [0.23, 1, 0.32, 1]

export default function Schedule5() {
  return (
    <section id="schedule" className="relative px-4 lg:px-8 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-[#f2ece3] font-black text-4xl md:text-6xl mb-3"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          Семь городов края
        </motion.h2>
        <motion.p
          className="text-[#d9bfa8] text-lg max-w-xl mb-10"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
        >
          Возможность выбрать площадку, до которой удобно добраться
        </motion.p>

        <TileGrid>
          {SCHEDULE.map(({ city, dates }, i) => (
            <Tile
              key={city}
              className={`tile19-glass p-6 flex flex-col justify-between min-h-[140px] col-span-6 ${
                i === 6 ? 'md:col-span-6' : 'md:col-span-3'
              }`}
            >
              <span className="text-[#d9bfa8]/70 font-bold text-xs" style={{ fontFamily: "'Unbounded', sans-serif" }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <div className="text-[#f2ece3] font-black text-xl md:text-2xl">{city}</div>
                <div className="text-[#d9bfa8] font-semibold text-sm mt-1">{dates}</div>
              </div>
            </Tile>
          ))}
          <Tile className="tile19-paper col-span-6 md:col-span-6 p-6 flex items-center">
            <p className="text-[#623b2a] text-sm md:text-base font-medium">
              Площадки в каждом городе — на уточнении. Два дня подряд: учёба и работа
              над личной дорожной картой.
            </p>
          </Tile>
        </TileGrid>
      </div>
    </section>
  )
}
