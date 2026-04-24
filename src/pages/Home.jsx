import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Lenis from 'lenis'
import Preloader from '../components/Preloader'
import Landing from '../components/Landing'
import Description from '../components/Description'
import Projects from '../components/Projects'
import SlidingImages from '../components/SlidingImages'
import ContactSection from '../components/Contact'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    setTimeout(() => {
      setIsLoading(false)
      document.body.style.cursor = 'default'
      window.scrollTo(0, 0)
    }, 2000)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>Malik Shahbaz - Flutter Developer</title>
        <meta name="description" content="Freelance Flutter Developer & Mobile App Specialist" />
      </Helmet>
      <main>
        <AnimatePresence mode="wait">
          {isLoading && <Preloader />}
        </AnimatePresence>
        <Landing />
        <Description />
        <Projects />
        <SlidingImages />
        <ContactSection />
      </main>
    </>
  )
}
