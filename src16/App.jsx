import Bg16 from './components/Bg16.jsx'
import Intro5 from './components/Intro5.jsx'
import Nav5 from './components/Nav5.jsx'
import Hero16 from './components/Hero16.jsx'
import Mission5 from './components/Mission5.jsx'
import Press15 from './components/Press15.jsx'
import Program5 from './components/Program5.jsx'
import Schedule5 from './components/Schedule5.jsx'
import Speakers5 from './components/Speakers5.jsx'
import Faq5 from './components/Faq5.jsx'
import Cta5 from './components/Cta5.jsx'
import Footer5 from './components/Footer5.jsx'

export default function App() {
  return (
    <div className="grain3 relative">
      <Bg16 />
      <Intro5 />
      <Nav5 />
      <main>
        <Hero16 />
        <Mission5 />
        <Program5 />
        <Schedule5 />
        <Speakers5 />
        <Press15 />
        <Faq5 />
        <Cta5 />
      </main>
      <Footer5 />
    </div>
  )
}
