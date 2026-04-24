import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import Magnetic from '../components/common/Magnetic'
import styles from './contact.module.scss'

export default function Contact() {
  const marqueeRef = useRef(null)

  useLayoutEffect(() => {
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 15,
      ease: "none"
    })
  }, [])

  const socials = ["GitHub", "LinkedIn", "Twitter", "Stack Overflow"]

  return (
    <main className={styles.contactPage}>
      <div className={styles.marqueeHeader}>
        <div className={styles.marquee}>
          <div className={styles.marqueeInner} ref={marqueeRef}>
            {[...Array(4)].map((_, i) => (
              <p key={i}>Contact—</p>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <h1 className={styles.headline}>Get in touch</h1>

        <Magnetic>
          <a href="mailto:malik.shahbaz@example.com" className={styles.emailLink}>
            malik.shahbaz@example.com
          </a>
        </Magnetic>

        <div className={styles.socialsSection}>
          <p className={styles.label}>OR REACH ME ON</p>
          <div className={styles.socialLinks}>
            {socials.map((social, index) => (
              <Magnetic key={index}>
                <a href="#" className={styles.socialButton}>
                  {social}
                </a>
              </Magnetic>
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <p>© 2024 Edition</p>
          <p>Pakistan</p>
        </div>
      </div>
    </main>
  )
}
