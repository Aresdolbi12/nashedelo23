/* Наклонная встречная лента-штамп: честные факты программы */
const ITEMS = ['бесплатно', '7 городов края', '16.09 — 30.10', 'очно и онлайн']

export default function SlantTape28({ angle = -2 }) {
  const row = Array.from({ length: 8 }, (_, k) => (
    <span key={k} className="inline-flex items-center shrink-0" aria-hidden={k > 0}>
      {ITEMS.map((t) => (
        <span key={t} className="inline-flex items-center gap-4 mx-6 text-sm md:text-base font-black uppercase tracking-[0.18em] text-[#0d2f22]">
          {t}
          <span className="w-2 h-2 rotate-45 bg-[#0d2f22]/70 inline-block" />
        </span>
      ))}
    </span>
  ))
  return (
    <div className="relative py-8 overflow-hidden" aria-hidden="true">
      <div className="tape28 py-3" style={{ transform: `rotate(${angle}deg) scale(1.06)` }}>
        <div className="tape28-track flex">{row}</div>
      </div>
    </div>
  )
}
