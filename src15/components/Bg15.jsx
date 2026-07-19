/* Фон «Зелёный стандарт»: глубокий статичный градиент Pantone 3435C
   с мягким бежевым свечением сверху и виньеткой по краям.
   Никакого useScroll и вечных анимаций — слой статичен и дёшев для GPU
   (мобильный урок v14). Контурные символы-очертания живут не здесь,
   а внутри секций (Hero, CTA), чтобы уезжать вместе с контентом. */
export default function Bg15() {
  return (
    <div className="bg-viewport11 fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Основной вертикальный градиент зелени */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #0d2f22 0%, #154734 30%, #175038 55%, #12402e 78%, #0d2f22 100%)',
        }}
      />
      {/* Тёплое бежевое свечение сверху по центру — «свет над сценой» */}
      <div
        className="absolute -top-[28%] left-1/2 -translate-x-1/2 w-[120vw] h-[80vh]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(217,191,168,0.14) 0%, rgba(217,191,168,0.05) 45%, transparent 70%)',
        }}
      />
      {/* Виньетка по краям — глубина кадра */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(7, 24, 17, 0.55) 100%)',
        }}
      />
    </div>
  )
}
