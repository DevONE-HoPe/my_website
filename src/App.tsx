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
import { ResumePage } from './components/Resume'
import { useAnimatedTitle } from './hooks/useAnimatedTitle'
import { useHash } from './hooks/useHash'
import { isResumeHash } from './data/resume'

export default function App() {
  const hash = useHash()
  const resume = isResumeHash(hash)
  useAnimatedTitle()

  return (
    <div className="min-h-screen">
      <Navbar />
      {resume ? (
        <main>
          <ResumePage />
        </main>
      ) : (
        <main>
          <Hero />
          <About />
          <Services />
          <Portfolio />
          <Process />
          <FAQ />
          <Contact />
        </main>
      )}
      <Footer />
      <ScrollTop />
    </div>
  )
}
