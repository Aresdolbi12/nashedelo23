const LINKS = [
  { href: '#about', label: 'О проекте' },
  { href: '#program', label: 'Программа' },
  { href: '#schedule', label: 'География' },
  { href: '#speakers', label: 'Спикеры' },
  { href: '#faq', label: 'Вопросы' },
]

export default function Footer3() {
  return (
    <footer className="relative bg-[#0f2847] text-gray-300 rounded-t-[32px]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-14">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5 text-white mb-4">
              <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#a8c8dc] to-[#5b87ad] flex items-center justify-center font-black text-[#0f2847]">
                Н
              </span>
              <span className="font-extrabold text-lg tracking-tight">Наше дело</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Практическая образовательная программа для ветеранов, участников СВО и их семей.
              Краснодарский край, сентябрь–октябрь 2026.
            </p>
          </div>
          <div className="flex gap-16">
            <ul className="space-y-2 text-sm">
              {LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="hover:text-white transition">{label}</a>
                </li>
              ))}
            </ul>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:info@nashe-delo.ru" className="hover:text-white transition">
                  info@nashe-delo.ru
                </a>
              </li>
              <li className="text-gray-400">Краснодарский край</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-gray-500">
          <span>© 2026 «Наше дело». Все права защищены.</span>
          <span>Организатор — ТПП Краснодарского края</span>
        </div>
      </div>
    </footer>
  )
}
