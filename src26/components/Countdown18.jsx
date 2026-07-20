import { useEffect, useState } from 'react'

/* Честный отсчёт до реального старта программы — первый интенсив,
   Белореченск, 16.09.2026. Никаких «осталось N мест» — только дата. */
const START = new Date('2026-09-16T09:00:00+03:00')

function parts() {
  const ms = Math.max(0, START - Date.now())
  const d = Math.floor(ms / 86400000)
  const h = Math.floor((ms % 86400000) / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  return { d, h, m, done: ms === 0 }
}

export default function Countdown18({ dark = false }) {
  const [t, setT] = useState(parts)
  useEffect(() => {
    const id = setInterval(() => setT(parts()), 15000)
    return () => clearInterval(id)
  }, [])

  if (t.done) return null
  const units = [
    [t.d, 'дней'],
    [t.h, 'часов'],
    [t.m, 'минут'],
  ]
  return (
    <div className="flex items-center gap-3 sm:gap-4" role="timer" aria-label="До старта программы">
      {units.map(([val, label]) => (
        <div key={label} className={`cd18 px-4 py-3 text-center ${dark ? 'cd18-dark' : ''}`}>
          <div className="cd18-num text-3xl md:text-4xl">{String(val).padStart(2, '0')}</div>
          <div className="cd18-label mt-1.5">{label}</div>
        </div>
      ))}
    </div>
  )
}
