import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import styles from './about.module.scss'

export default function About() {
  const marqueeRef = useRef(null)

  useLayoutEffect(() => {
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 15,
      ease: "none"
    })
  }, [])

  const services = [
    "Flutter App Development",
    "iOS & Android Apps",
    "UI/UX Implementation",
    "API Integration",
    "App Store Deployment"
  ]

  const expertise = [
    "Flutter", "Dart", "Firebase", "REST APIs", "Provider",
    "Bloc", "GetX", "SQLite", "Git", "Figma"
  ]

  return (
    <main className={styles.about}>
      <div className={styles.marqueeHeader}>
        <div className={styles.marquee}>
          <div className={styles.marqueeInner} ref={marqueeRef}>
            {[...Array(4)].map((_, i) => (
              <p key={i}>About—</p>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <div className={styles.portraitContainer}>
            <img
              src="/images/background.png"
              alt="Malik Shahbaz"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center center'
              }}
            />
          </div>
        </div>

        <div className={styles.rightColumn}>
          <section className={styles.section}>
            <h2>About</h2>
            <p className={styles.bio}>
              I'm Malik Shahbaz, a freelance Flutter developer specializing in building 
              beautiful, high-performance mobile applications. With expertise in cross-platform 
              development, I help businesses bring their ideas to life on iOS and Android.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Services</h2>
            <div className={styles.servicesList}>
              {services.map((service, index) => (
                <div key={index} className={styles.serviceRow}>
                  <span>{service}</span>
                  <span className={styles.arrow}>→</span>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h2>Expertise</h2>
            <div className={styles.expertiseTags}>
              {expertise.map((skill, index) => (
                <span key={index} className={styles.tag}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
