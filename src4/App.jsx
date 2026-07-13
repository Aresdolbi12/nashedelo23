import Nav4 from './components/Nav4.jsx'
import Hero4 from './components/Hero4.jsx'
import Tape from './components/Tape.jsx'
import About4 from './components/About4.jsx'
import Program4 from './components/Program4.jsx'
import Schedule4 from './components/Schedule4.jsx'
import Speakers4 from './components/Speakers4.jsx'
import Faq4 from './components/Faq4.jsx'
import Cta4 from './components/Cta4.jsx'
import Footer4 from './components/Footer4.jsx'

export default function App() {
  return (
    <>
      <Nav4 />
      <main className="relative z-10">
        <Hero4 />
        <Tape rotate={-2.5} />
        <About4 />
        <Program4 />
        <Schedule4 />
        <Tape rotate={2} />
        <Speakers4 />
        <Faq4 />
        <Cta4 />
      </main>
      <Footer4 />
    </>
  )
}
