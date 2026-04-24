import { useRef } from 'react'
import { useInView, motion } from 'framer-motion'
import styles from './style.module.scss'
import { slideUp, opacity } from './anim'
import RoundedButton from '../common/RoundedButton'

const phrase = "Building beautiful mobile experiences with Flutter. Creating cross-platform apps that users love. Specializing in iOS and Android development with clean, maintainable code."

export default function Description() {
  const description = useRef(null)
  const isInView = useInView(description)

  return (
    <div ref={description} className={styles.description}>
      <div className={styles.body}>
        <p>
          {phrase.split(" ").map((word, index) => (
            <span key={index} className={styles.mask}>
              <motion.span
                variants={slideUp}
                custom={index}
                animate={isInView ? "open" : "closed"}
                initial="closed"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </p>
        <motion.p
          variants={opacity}
          animate={isInView ? "open" : "closed"}
          initial="closed"
        >
          With expertise in Flutter, Dart, and mobile app architecture, I create 
          high-performance applications that work seamlessly across platforms.
        </motion.p>
        <div data-scroll data-scroll-speed={0.1}>
          <RoundedButton>
            <p>About me</p>
          </RoundedButton>
        </div>
      </div>
    </div>
  )
}
