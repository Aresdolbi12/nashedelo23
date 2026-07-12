const LINKS = [
  { href: '#about', label: 'О проекте' },
  { href: '#program', label: 'Программа' },
  { href: '#schedule', label: 'Расписание' },
  { href: '#speakers', label: 'Спикеры' },
  { href: '#faq', label: 'Вопросы' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0f2847] text-gray-300 relative">
      <div className="divider-metal absolute top-0 left-0 right-0" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 metal-gradient rounded-sm flex items-center justify-center">
                <span className="font-display font-black text-white text-lg">Н</span>
              </div>
              <div>
                <div className="font-display font-bold text-white text-[15px] leading-none">НАШЕ ДЕЛО</div>
                <div className="text-[10px] tracking-[0.2em] text-gray-400 mt-1 uppercase">
                  Образовательная программа
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              Практическая образовательная программа для ветеранов, участников СВО и их семей. Строим
              фундамент новой мирной жизни — через предпринимательство, знание и поддержку. Краснодарский
              край.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4">Разделы</h4>
            <ul className="space-y-2 text-sm">
              {LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="hover:text-white transition">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4">Контакты</h4>
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
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">© 2026 «Наше дело». Все права защищены.</p>
          <p className="text-xs text-gray-500 tracking-wider uppercase">Сила · Знание · Мир</p>
        </div>
      </div>
    </footer>
  )
}
