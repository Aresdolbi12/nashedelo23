const LINKS = [
  { href: '#about', label: 'О проекте' },
  { href: '#program', label: 'Программа' },
  { href: '#schedule', label: 'Маршрут' },
  { href: '#speakers', label: 'Спикеры' },
  { href: '#faq', label: 'Вопросы' },
]

/* Футер как основная надпись чертежа (ГОСТ-штамп) */
export default function Footer2() {
  return (
    <footer className="steel-band text-gray-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="border border-white/25">
          <div className="grid md:grid-cols-[1fr_auto] border-b border-white/25">
            <div className="p-6 md:border-r border-white/25">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 metal-gradient chamfer-sm flex items-center justify-center">
                  <span className="font-display font-black text-white text-lg">Н</span>
                </div>
                <div>
                  <div className="font-display font-bold text-white text-[15px] leading-none">НАШЕ ДЕЛО</div>
                  <div className="text-[10px] tracking-[0.2em] text-gray-400 mt-1 uppercase">
                    Чертёж вашего дела
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed max-w-md">
                Практическая образовательная программа для ветеранов, участников СВО и их семей.
                Краснодарский край, сентябрь–октябрь 2026.
              </p>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <div className="p-6 border-r border-white/25">
                <div className="text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-3">Разделы</div>
                <ul className="space-y-1.5">
                  {LINKS.map(({ href, label }) => (
                    <li key={href}>
                      <a href={href} className="hover:text-white transition">{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6">
                <div className="text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-3">Контакты</div>
                <ul className="space-y-1.5">
                  <li>
                    <a href="mailto:info@nashe-delo.ru" className="hover:text-white transition">
                      info@nashe-delo.ru
                    </a>
                  </li>
                  <li className="text-gray-400">Краснодарский край</li>
                </ul>
              </div>
            </div>
          </div>
          {/* Нижняя строка штампа */}
          <div className="grid grid-cols-2 md:grid-cols-4 text-[11px] tracking-[0.12em] uppercase">
            <div className="px-4 py-3 border-r border-white/25 text-gray-400">Разраб. — ТПП КК</div>
            <div className="px-4 py-3 md:border-r border-white/25 text-gray-400">Лист 7 · листов 7</div>
            <div className="px-4 py-3 border-r border-white/25 text-gray-400 border-t md:border-t-0">Масштаб 1:1</div>
            <div className="px-4 py-3 text-gray-400 border-t md:border-t-0">© 2026 «Наше дело»</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
