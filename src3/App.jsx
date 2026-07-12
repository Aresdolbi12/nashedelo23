import Bg from './components/Bg.jsx'
import Nav3 from './components/Nav3.jsx'
import Hero3 from './components/Hero3.jsx'
import Mission from './components/Mission.jsx'
import Program3 from './components/Program3.jsx'
import Schedule3 from './components/Schedule3.jsx'
import Speakers3 from './components/Speakers3.jsx'
import Faq3 from './components/Faq3.jsx'
import Cta3 from './components/Cta3.jsx'
import Footer3 from './components/Footer3.jsx'

export default function App() {
  return (
    <div className="grain3">
      <Bg />
      <Nav3 />
      <main>
        <Hero3 />
        <Mission />
        <Program3 />
        <Schedule3 />
        <Speakers3 />
        <Faq3 />
        <Cta3 />
      </main>
      <Footer3 />
    </div>
  )
}
