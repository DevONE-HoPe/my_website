import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Services } from './components/Services'
import { Process } from './components/Process'
import { Portfolio } from './components/Portfolio'
import { FAQ } from './components/FAQ'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { ScrollTop } from './components/ScrollTop'
import { useAnimatedTitle } from './hooks/useAnimatedTitle'

export default function App() {
  useAnimatedTitle()

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Process />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
    </div>
  )
}
