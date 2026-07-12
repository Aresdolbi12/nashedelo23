import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Program from './components/Program.jsx'
import Schedule from './components/Schedule.jsx'
import Speakers from './components/Speakers.jsx'
import Faq from './components/Faq.jsx'
import Cta from './components/Cta.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Program />
        <Schedule />
        <Speakers />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
