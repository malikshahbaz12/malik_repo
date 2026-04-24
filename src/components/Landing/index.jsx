import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import styles from './style.module.scss'

export default function Landing() {
  const imageRef = useRef(null)
  const marqueeRef = useRef(null)
  const marqueeStripRef = useRef(null)
  const landingRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current || !marqueeStripRef.current || !landingRef.current) return
      
      const scrollY = window.scrollY
      const speed = -0.3
      const yPos = scrollY * speed
      
      imageRef.current.style.transform = `translate3d(0, ${yPos}px, 0)`

      // Calculate hero section visibility
      const heroHeight = landingRef.current.offsetHeight
      const scrollProgress = scrollY / heroHeight
      
      // Responsive fade thresholds - faster fade on mobile
      const isMobile = window.innerWidth <= 767
      const fadeStart = isMobile ? 0.05 : 0.1
      const fadeRange = isMobile ? 0.25 : 0.4
      
      // Fade out marquee as we scroll down, fade in when back at top
      let opacity = 1
      if (scrollProgress > fadeStart) {
        opacity = Math.max(0, 1 - ((scrollProgress - fadeStart) / fadeRange))
      }
      
      marqueeStripRef.current.style.opacity = opacity
      marqueeStripRef.current.style.visibility = opacity === 0 ? 'hidden' : 'visible'
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent : -50,
        repeat   : -1,
        duration : 15,
        ease     : 'none',
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.landing} ref={landingRef}>
      <div className={styles.heroContent}>
        <div className={styles.headerAbove}>
          <div className={styles.arrow}>
            <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-1019.000000, -279.000000)" stroke="currentColor" strokeWidth="1.5">
                  <g transform="translate(1026.000000, 286.000000) rotate(90.000000) translate(-1026.000000, -286.000000) translate(1020.000000, 280.000000)">
                    <polyline points="2.76923077 0 12 0 12 9.23076923"></polyline>
                    <line x1="12" y1="0" x2="0" y2="12"></line>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>
        <h1 className={styles.heroTitle}>
          <span>Freelance</span> Flutter Developer
        </h1>
        <p className={styles.heroSubtitle}>
          Building beautiful mobile experiences with Flutter.
        </p>
      </div>
      
      <div className={styles.imageWrapper} ref={imageRef}>
        <img
          src="/images/background.png"
          alt="Malik Shahbaz - Flutter Developer"
          className={styles.heroImage}
        />
      </div>

      <div className={styles.marqueeStrip} ref={marqueeStripRef}>
        <div className={styles.marqueeTrack} ref={marqueeRef}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className={styles.marqueeItem}>
              Malik Shahbaz—
            </span>
          ))}
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <span className={styles.scrollText}>Scroll</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  )
}
