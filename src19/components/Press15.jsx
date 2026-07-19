import { motion } from 'framer-motion'
import { Tile, TileGrid } from './Hero19.jsx'

const EASE = [0.23, 1, 0.32, 1]

/* Цитаты — ЗАГЛУШКИ по просьбе заказчика (см. подпись под блоком) */
const ROWS = [
  { outlet: 'Деловая газета. Юг', quote: 'Программа помогает ветеранам сделать первый шаг из армии в собственное дело' },
  { outlet: 'Кубань 24', quote: 'Семь городов края примут бесплатные бизнес-интенсивы для участников СВО и их семей' },
  { outlet: 'РБК Краснодар', quote: 'Пример программы, где за словами сразу следует план действий' },
]

export default function Press15() {
  return (
    <section id="press" className="relative px-4 lg:px-8 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-[#f2ece3] font-black text-4xl md:text-6xl mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          О нас пишут
        </motion.h2>
        <TileGrid>
          {ROWS.map(({ outlet, quote }, i) => (
            <Tile
              key={outlet}
              className={`tile19-metal p-7 md:p-8 col-span-12 ${i === 0 ? 'md:col-span-6' : 'md:col-span-3'}`}
            >
              <figure>
                <figcaption className="font-black uppercase tracking-[0.14em] text-[12px]">{outlet}</figcaption>
                <blockquote className="mt-3 font-semibold text-sm md:text-base leading-snug">«{quote}»</blockquote>
              </figure>
            </Tile>
          ))}
        </TileGrid>
        <p className="text-[#d9c9b8]/45 text-xs mt-6">
          Примеры вида публикаций. Реальные материалы появятся здесь после старта программы.
        </p>
      </div>
    </section>
  )
}
