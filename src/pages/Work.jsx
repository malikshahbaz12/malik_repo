import { useRef, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import styles from './work.module.scss'

const projects = [
  { title: "E-Commerce App", color: "#667eea", slug: "ecommerce-app" },
  { title: "Food Delivery", color: "#f093fb", slug: "food-delivery" },
  { title: "Fitness Tracker", color: "#4facfe", slug: "fitness-tracker" },
  { title: "Social Media", color: "#43e97b", slug: "social-media" },
  { title: "Banking App", color: "#fa709a", slug: "banking-app" },
  { title: "Travel Planner", color: "#30cfd0", slug: "travel-planner" },
  { title: "Music Player", color: "#a8edea", slug: "music-player" },
  { title: "Weather App", color: "#fbc2eb", slug: "weather-app" },
  { title: "Task Manager", color: "#f093fb", slug: "task-manager" },
  { title: "Chat Application", color: "#4facfe", slug: "chat-app" },
  { title: "Recipe Finder", color: "#43e97b", slug: "recipe-finder" },
  { title: "Expense Tracker", color: "#fa709a", slug: "expense-tracker" },
  { title: "News Reader", color: "#667eea", slug: "news-reader" },
  { title: "Meditation App", color: "#f093fb", slug: "meditation-app" }
]

export default function Work() {
  const marqueeRef = useRef(null)

  useLayoutEffect(() => {
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 15,
      ease: "none"
    })
  }, [])

  return (
    <main className={styles.work}>
      <div className={styles.marqueeHeader}>
        <div className={styles.marquee}>
          <div className={styles.marqueeInner} ref={marqueeRef}>
            {[...Array(4)].map((_, i) => (
              <p key={i}>Work—</p>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.projectGrid}>
        {projects.map((project, index) => (
          <Link to={`/${project.slug}`} key={index} className={styles.projectCard}>
            <div className={styles.imageArea}>
              <div style={{
                width: '100%',
                height: '100%',
                background: `linear-gradient(135deg, ${project.color} 0%, #764ba2 100%)`
              }} />
            </div>
            <div className={styles.projectInfo}>
              <h3>{project.title}</h3>
              <p>Flutter Development</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
