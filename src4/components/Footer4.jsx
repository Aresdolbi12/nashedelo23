const LINKS = [
  { href: '#about', label: 'О проекте' },
  { href: '#program', label: 'Программа' },
  { href: '#schedule', label: 'Афиша' },
  { href: '#speakers', label: 'Спикеры' },
  { href: '#faq', label: 'Вопросы' },
]

export default function Footer4() {
  return (
    <footer className="bg-[color:var(--ink)] text-[color:var(--paper)] border-t-[6px] border-[color:var(--blue)]">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-14">
        <div className="grid md:grid-cols-3 gap-10 items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 bg-[color:var(--paper)] text-[color:var(--ink)] flex items-center justify-center font-poster font-bold text-xl">
                Н
              </span>
              <span className="font-poster font-semibold text-xl">Наше дело</span>
            </div>
            <p className="text-sm text-[color:var(--paper)]/60 leading-relaxed max-w-xs">
              Практическая образовательная программа для ветеранов, участников СВО и их семей.
              Краснодарский край, 2026.
            </p>
          </div>
          <ul className="space-y-1.5 font-poster font-medium text-lg uppercase">
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="hover:text-[color:var(--sky)] transition-colors">{label}</a>
              </li>
            ))}
          </ul>
          <ul className="space-y-1.5 text-sm md:text-right">
            <li>
              <a href="mailto:info@nashe-delo.ru" className="hover:text-[color:var(--sky)] transition-colors">
                info@nashe-delo.ru
              </a>
            </li>
            <li className="text-[color:var(--paper)]/60">Организатор — ТПП Краснодарского края</li>
            <li className="text-[color:var(--paper)]/60">© 2026 «Наше дело»</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
