import Bg11 from './components/Bg11.jsx'
import QuoteBreak11 from './components/QuoteBreak11.jsx'
import Intro5 from './components/Intro5.jsx'
import Nav5 from './components/Nav5.jsx'
import Hero11 from './components/Hero11.jsx'
import Mission5 from './components/Mission5.jsx'
import Program5 from './components/Program5.jsx'
import Schedule5 from './components/Schedule5.jsx'
import Speakers5 from './components/Speakers5.jsx'
import Faq5 from './components/Faq5.jsx'
import Cta5 from './components/Cta5.jsx'
import Footer5 from './components/Footer5.jsx'

export default function App() {
  return (
    <div className="grain3">
      <Bg11 />
      <Intro5 />
      <Nav5 />
      <main>
        <Hero11 />
        <Mission5 />
        {/* Цитаты-интерлюдии: тон подобран под цвет неба в этой точке скролла */}
        <QuoteBreak11 index={0} tone="dark" />
        <Program5 />
        <Schedule5 />
        <QuoteBreak11 index={1} tone="light" />
        <Speakers5 />
        <QuoteBreak11 index={2} tone="light" />
        <Faq5 />
        <QuoteBreak11 index={3} tone="light" />
        <Cta5 />
      </main>
      <Footer5 />
    </div>
  )
}
