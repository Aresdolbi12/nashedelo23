import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const KEY = 'nd-cookie-ok'

/* Уведомление о cookie/Яндекс.Метрике (рекомендация аудита 152-ФЗ, 24.07.2026):
   информируем посетителя об аналитике и даём ссылку на политику.
   Полоска над нижним краем, слева — чтобы не спорить со sticky-CTA справа.
   Появляется с задержкой, после «Хорошо» не показывается (localStorage). */
export default function CookieNote33() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let ok = false
    try {
      ok = localStorage.getItem(KEY) === '1'
    } catch { /* приватный режим без localStorage — покажем снова */ }
    if (!ok) {
      const t = setTimeout(() => setShow(true), 1600)
      return () => clearTimeout(t)
    }
  }, [])

  const accept = () => {
    try {
      localStorage.setItem(KEY, '1')
    } catch { /* нет localStorage — просто скрываем до перезагрузки */ }
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-3 left-3 right-3 sm:right-auto sm:max-w-[420px] z-[90] rounded-2xl border border-[#d9bfa8]/30 bg-[#0d2f22]/95 backdrop-blur px-5 py-4 shadow-[0_18px_44px_-16px_rgba(0,0,0,0.6)]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
          role="region"
          aria-label="Уведомление об использовании cookie"
        >
          <p className="text-[#e8ddd0] text-[13px] leading-snug">
            Сайт использует cookie и Яндекс.Метрику для статистики посещаемости.
            Продолжая, вы соглашаетесь с{' '}
            <a href="../privacy/" className="underline underline-offset-2 font-semibold hover:text-white">
              политикой обработки персональных данных
            </a>.
          </p>
          <button
            onClick={accept}
            className="btn-light mt-3 px-5 py-2 text-[13px] font-bold cursor-pointer"
          >
            Хорошо
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
