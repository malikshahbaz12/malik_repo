import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './style.module.scss'
import Nav from './nav'

export default function Header() {
  const location = useLocation()
  const pathname = location.pathname
  const [isActive, setIsActive] = useState(false)
  const header = useRef(null)
  const button = useRef(null)

  useEffect(() => {
    if (isActive) setIsActive(false)
  }, [pathname])

  useLayoutEffect(() => {
    // Skip ScrollTrigger on mobile - burger is always visible
    if (window.innerWidth < 768) {
      return
    }

    gsap.registerPlugin(ScrollTrigger)
    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        onLeave: () => gsap.to(button.current, { scale: 1, duration: 0.25, ease: "power1.out" }),
        onEnterBack: () => gsap.to(button.current, { scale: 0, duration: 0.25, ease: "power1.out" })
      }
    })
  }, [])

  return (
    <>
      <div ref={header} className={styles.header}>
        <div className={styles.logo}>
          <p className={styles.copyright}>©</p>
          <div className={styles.name}>
            <p className={styles.codeBy}>Code by</p>
            <p className={styles.dennis}>Malik</p>
            <p className={styles.snellenberg}>Shahbaz</p>
          </div>
        </div>
        <div className={styles.nav}>
          {['Work', 'About', 'Contact'].map(item => (
            <div key={item} className={styles.el}>
              <a href={`/${item.toLowerCase()}`}>{item}</a>
              <div className={styles.indicator}></div>
            </div>
          ))}
        </div>
      </div>
      <div ref={button} className={styles.headerButtonContainer}>
        <div
          onClick={() => setIsActive(!isActive)}
          className={`${styles.button} ${isActive ? styles.burgerActive : ""}`}
        >
          <div className={styles.burger}></div>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {isActive && <Nav />}
      </AnimatePresence>
    </>
  )
}
