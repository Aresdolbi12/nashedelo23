/* Диагональная лента-стикер поперёк листа */
const ITEMS = ['Бесплатно', '7 городов края', '2 дня интенсива', '9 экспертов', 'Вебинары', 'Дорожная карта']

export default function Tape({ rotate = -2.5 }) {
  return (
    <div className="relative py-6 overflow-hidden" aria-hidden="true">
      <div className="tape py-3 w-[130%] -ml-[15%]" style={{ transform: `rotate(${rotate}deg)` }}>
        <div className="tape-track">
          {[0, 1].map((copy) => (
            <span key={copy} className="inline-flex">
              {ITEMS.map((item) => (
                <span key={item + copy} className="font-poster font-medium text-lg mx-7 inline-flex items-center gap-7">
                  {item}
                  <span className="text-[color:var(--sky)]">★</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
