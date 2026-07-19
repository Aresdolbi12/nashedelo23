/* Фон «Эдиториал»: тёплая бумага со слабым светом сверху и едва заметной
   виньеткой. Статичный слой — ноль постоянной работы GPU (урок v14).
   Тёмные полосы-акценты рисуют сами секции, фон всегда бумажный. */
export default function Bg16() {
  return (
    <div className="bg-viewport11 fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #f7f0e5 0%, #f4ecdf 40%, #f1e7d7 100%)',
        }}
      />
      {/* Свет из верхнего левого угла — «утро в редакции» */}
      <div
        className="absolute -top-[30%] -left-[10%] w-[80vw] h-[70vh]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255,252,245,0.85) 0%, rgba(255,252,245,0.25) 45%, transparent 70%)',
        }}
      />
      {/* Едва заметная тёплая виньетка */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, transparent 60%, rgba(98, 59, 42, 0.07) 100%)',
        }}
      />
    </div>
  )
}
