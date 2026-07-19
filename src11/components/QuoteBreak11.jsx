import { motion } from 'framer-motion'
import { QUOTES } from '../content.js'

const EASE = [0.19, 1, 0.22, 1]

/* Перемешивание Фишера–Йейтса: порядок цитат случайный при каждой загрузке.
   Один общий порядок на модуль — все интерлюдии страницы берут из него по index. */
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
const ORDER = shuffle(QUOTES)

/* Цитата-интерлюдия между секциями: крупная строгая типографика в потоке
   страницы (ничего не перекрывает, работает на любой ширине). tone задаёт
   цвет под фон в этой точке скролла: dark = ещё тёмное небо, light = день. */
export default function QuoteBreak11({ index, tone = 'light' }) {
  const dark = tone === 'dark'
  const quote = ORDER[index % ORDER.length]

  return (
    <aside className="px-6 py-20 md:py-28" aria-label="Цитата">
      <div className="max-w-3xl mx-auto text-center">
        {/* Ромб-маркер — как разделители в ленте городов */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, scaleX: 0.6 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE }}
          aria-hidden="true"
        >
          <span className={`h-px w-14 md:w-24 ${dark ? 'bg-white/30' : 'bg-[#0f2847]/25'}`} />
          <span className={`w-2 h-2 rotate-45 shrink-0 ${dark ? 'bg-[#a8c8dc]' : 'bg-[#1e4976]'}`} />
          <span className={`h-px w-14 md:w-24 ${dark ? 'bg-white/30' : 'bg-[#0f2847]/25'}`} />
        </motion.div>

        <motion.blockquote
          className={`font-light italic text-2xl md:text-[34px] leading-snug md:leading-snug ${
            dark ? 'text-white/90' : 'text-[#0f2847]'
          }`}
          initial={{ opacity: 0, y: 26, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
        >
          «{quote}»
        </motion.blockquote>
      </div>
    </aside>
  )
}
