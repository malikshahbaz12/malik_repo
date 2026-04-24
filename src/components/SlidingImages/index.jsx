import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import styles from './style.module.scss'

const slider1 = [
  { color: "#e3e5e7" },
  { color: "#d6d7dc" },
  { color: "#e3e3e3" },
  { color: "#21242b" }
]

const slider2 = [
  { color: "#d4e3ec" },
  { color: "#e5e0e1" },
  { color: "#d7d4cf" },
  { color: "#e1dad6" }
]

export default function SlidingImages() {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  })

  // Reduce movement on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const x1 = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 60 : 150])
  const x2 = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -60 : -150])
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0])

  return (
    <div ref={container} className={styles.slidingImages}>
      <motion.div style={{ x: x1 }} className={styles.slider}>
        {slider1.map((project, index) => (
          <div key={index} className={styles.project} style={{ backgroundColor: project.color }}>
            <div className={styles.imageContainer} />
          </div>
        ))}
      </motion.div>
      <motion.div style={{ x: x2 }} className={styles.slider}>
        {slider2.map((project, index) => (
          <div key={index} className={styles.project} style={{ backgroundColor: project.color }}>
            <div className={styles.imageContainer} />
          </div>
        ))}
      </motion.div>
      <motion.div style={{ height }} className={styles.circleContainer}>
        <div className={styles.circle}></div>
      </motion.div>
    </div>
  )
}
