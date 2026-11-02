import { useEffect, useRef, useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, useGSAP } from './lib/gsap'
import { lenisRef } from './lib/lenis'
import { marqueeWords } from './data'
import Cursor from './components/Cursor'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Highlights from './components/Highlights'
import Education from './components/Education'
import Contact from './components/Contact'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const progress = useRef<HTMLDivElement>(null)
  const onDone = useCallback(() => setLoaded(true), [])

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true })
    lenisRef.current = lenis
    lenis.stop()
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(raf); lenis.destroy(); lenisRef.current = null }
  }, [])

  useEffect(() => {
    if (!loaded) return
    window.scrollTo(0, 0)
    lenisRef.current?.start()
    const t = setTimeout(() => ScrollTrigger.refresh(), 1200)
    return () => clearTimeout(t)
  }, [loaded])

  useGSAP(() => {
    gsap.to(progress.current, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } })
  })

  return (
    <>
      <Cursor />
      <div className="progress" ref={progress} />
      <AnimatePresence>{!loaded && <Preloader onDone={onDone} />}</AnimatePresence>
      <Nav ready={loaded} />
      <main>
        <Hero ready={loaded} />
        <Marquee words={marqueeWords} />
        <About />
        <Skills />
        <Experience />
        <Marquee words={['Node.js', 'Express', 'MySQL', 'MongoDB', 'Redis', 'Three.js', 'WebXR', 'React', 'Docker', 'Git']} dark speed={30} />
        <Projects />
        <Highlights />
        <Education />
        <Contact />
      </main>
    </>
  )
}
