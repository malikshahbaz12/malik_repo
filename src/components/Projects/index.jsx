import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import styles from './style.module.scss'

const projects = [
  { title: "E-Commerce App", color: "#667eea", href: "/ecommerce-app" },
  { title: "Food Delivery", color: "#f093fb", href: "/food-delivery" },
  { title: "Fitness Tracker", color: "#4facfe", href: "/fitness-tracker" },
  { title: "Social Media", color: "#43e97b", href: "/social-media" }
]

export default function Projects() {
  const container = useRef(null)
  const imageContainer = useRef(null)
  const [activeImage, setActiveImage] = useState(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const targetPos = useRef({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Skip lerp animation on mobile
    if (window.innerWidth < 768) {
      return () => window.removeEventListener('resize', checkMobile)
    }

    let animId
    const lerp = () => {
      targetPos.current.x += (mousePos.current.x - targetPos.current.x) * 0.075
      targetPos.current.y += (mousePos.current.y - targetPos.current.y) * 0.075
      if (imageContainer.current) {
        gsap.set(imageContainer.current, {
          x: targetPos.current.x,
          y: targetPos.current.y
        })
      }
      animId = requestAnimationFrame(lerp)
    }
    animId = requestAnimationFrame(lerp)
    
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const handleMouseMove = (e) => {
    if (isMobile) return
    const rect = container.current.getBoundingClientRect()
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }

  const handleMouseEnter = (index) => {
    if (isMobile) return
    setActiveImage(index)
    gsap.to(imageContainer.current, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" })
  }

  const handleMouseLeave = () => {
    if (isMobile) return
    setActiveImage(null)
    gsap.to(imageContainer.current, { opacity: 0, scale: 0.8, duration: 0.4 })
  }

  return (
    <section
      ref={container}
      className={styles.projects}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.projectList}>
        <div className={styles.sectionHeader}>
          <p>Recent work</p>
        </div>
        {projects.map((project, index) => (
          <Link to={project.href} key={index}>
            <div
              className={styles.projectRow}
              onMouseEnter={() => handleMouseEnter(index)}
            >
              <h2>{project.title}</h2>
              <p className={styles.category}>Flutter Development</p>
            </div>
          </Link>
        ))}
        <div className={styles.moreWork}>
          <Link to="/work">More work 14 →</Link>
        </div>
      </div>
      {!isMobile && (
        <div ref={imageContainer} className={styles.imageContainer}>
          {projects.map((project, index) => (
            <div
              key={index}
              className={styles.imageWrapper}
              style={{ 
                opacity: activeImage === index ? 1 : 0,
                background: `linear-gradient(135deg, ${project.color} 0%, #764ba2 100%)`
              }}
            />
          ))}
        </div>
      )}
    </section>
  )
}
