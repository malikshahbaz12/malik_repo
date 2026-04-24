import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation, Link } from 'react-router-dom'
import styles from './style.module.scss'
import { links } from './data'
import { menuSlide, slide, scale } from './anim'
import Curve from './Curve'
import Footer from './Footer'

export default function Nav() {
  const location = useLocation()
  const pathname = location.pathname
  const [selectedIndicator, setSelectedIndicator] = useState(null)

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.menu}
    >
      <div className={styles.body}>
        <div className={styles.nav}>
          <div className={styles.header}>
            <p>Menu</p>
          </div>
          {links.map((data, index) => (
            <motion.div
              key={index}
              className={styles.navLinkContainer}
              onMouseEnter={() => setSelectedIndicator(data.href)}
              onMouseLeave={() => setSelectedIndicator(null)}
              custom={index}
              variants={slide}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <motion.div
                variants={scale}
                animate={selectedIndicator === data.href ? "open" : "closed"}
                className={styles.indicator}
              ></motion.div>
              <Link to={data.href}>{data.title}</Link>
            </motion.div>
          ))}
        </div>
        <Footer />
      </div>
      <Curve />
    </motion.div>
  )
}
