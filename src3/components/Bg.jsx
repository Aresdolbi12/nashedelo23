import { motion, useScroll, useTransform } from 'framer-motion'

/* Живое небо: фон страницы светлеет от предрассветной стали к дневному небу,
   облака проявляются, к финалу встаёт солнце. Всё привязано к скроллу. */
export default function Bg() {
  const { scrollYProgress } = useScroll()

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.32, 0.58, 0.82, 1],
    ['#0c1e35', '#28517d', '#7fadcd', '#c9dfec', '#eef5fa'],
  )
  const cloudsOpacity = useTransform(scrollYProgress, [0.15, 0.5], [0.12, 0.85])
  const sunOpacity = useTransform(scrollYProgress, [0.65, 0.95], [0, 1])
  const horizonOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  return (
    <motion.div className="fixed inset-0 -z-10 overflow-hidden" style={{ backgroundColor }} aria-hidden="true">
      {/* Полоска зари у горизонта — видна только в начале */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[40vh]"
        style={{
          opacity: horizonOpacity,
          background: 'linear-gradient(180deg, transparent, rgba(120,160,200,0.35) 60%, rgba(180,205,228,0.5))',
        }}
      />
      <motion.div className="absolute inset-0" style={{ opacity: cloudsOpacity }}>
        <div className="cloud3" style={{ width: 520, height: 150, top: '12%', left: '-8%', '--drift': '90s' }} />
        <div className="cloud3" style={{ width: 420, height: 120, top: '32%', right: '-6%', '--drift': '110s' }} />
        <div className="cloud3" style={{ width: 340, height: 100, top: '58%', left: '12%', '--drift': '80s' }} />
        <div className="cloud3" style={{ width: 460, height: 130, top: '76%', right: '10%', '--drift': '120s' }} />
      </motion.div>
      {/* Солнце к финалу */}
      <motion.div
        className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px]"
        style={{
          opacity: sunOpacity,
          background: 'radial-gradient(circle, rgba(255,252,240,0.95), rgba(255,248,225,0.35) 40%, transparent 70%)',
        }}
      />
    </motion.div>
  )
}
