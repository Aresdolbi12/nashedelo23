import Bg from './components/Bg.jsx'
import DawnLine from './components/DawnLine.jsx'
import Intro5 from './components/Intro5.jsx'
import Nav5 from './components/Nav5.jsx'
import Hero5 from './components/Hero5.jsx'
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
      <Bg />
      <DawnLine />
      <Intro5 />
      <Nav5 />
      <main>
        <Hero5 />
        <Mission5 />
        <Program5 />
        <Schedule5 />
        <Speakers5 />
        <Faq5 />
        <Cta5 />
      </main>
      <Footer5 />
    </div>
  )
}
