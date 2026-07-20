import Bg22 from './components/Bg22.jsx'
import Quotes26 from './components/Quotes26.jsx'
import Intro5 from './components/Intro5.jsx'
import Nav5 from './components/Nav5.jsx'
import Hero26 from './components/Hero26.jsx'
import Mission5 from './components/Mission5.jsx'
import Press15 from './components/Press15.jsx'
import Program5 from './components/Program5.jsx'
import Filmstrip26 from './components/Filmstrip26.jsx'
import Speakers5 from './components/Speakers5.jsx'
import Faq5 from './components/Faq5.jsx'
import Cta5 from './components/Cta5.jsx'
import Footer5 from './components/Footer5.jsx'
import StickyCta21 from './components/StickyCta21.jsx'

export default function App() {
  return (
    <div className="grain3 relative">
      <Bg22 />
      {/* Таблички-цитаты живут на фоне (отрицательный z-index), скролл не удлиняют */}
      <Quotes26 />
      <Intro5 />
      <Nav5 />
      <main>
        <Hero26 />
        <Mission5 />
        <Program5 />
        <Filmstrip26 />
        <Speakers5 />
        <Press15 />
        <Faq5 />
        <Cta5 />
      </main>
      <Footer5 />
      <StickyCta21 />
    </div>
  )
}
