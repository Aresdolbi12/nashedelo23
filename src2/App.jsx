import Intro from './components/Intro.jsx'
import Nav2 from './components/Nav2.jsx'
import Hero2 from './components/Hero2.jsx'
import About2 from './components/About2.jsx'
import Program2 from './components/Program2.jsx'
import Schedule2 from './components/Schedule2.jsx'
import Speakers2 from './components/Speakers2.jsx'
import Faq2 from './components/Faq2.jsx'
import Cta2 from './components/Cta2.jsx'
import Footer2 from './components/Footer2.jsx'

export default function App() {
  return (
    <>
      <Intro />
      <div className="ruler" aria-hidden="true" />
      <Nav2 />
      <main>
        <Hero2 />
        <About2 />
        <Program2 />
        <Schedule2 />
        <Speakers2 />
        <Faq2 />
        <Cta2 />
      </main>
      <Footer2 />
    </>
  )
}
