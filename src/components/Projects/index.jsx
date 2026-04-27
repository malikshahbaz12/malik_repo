import { useRef } from 'react'
import FlowingMenu from '../FlowingMenu'
import styles from './style.module.scss'

const projects = [
  { 
    link: "/ecommerce-app", 
    text: "E-Commerce Applications",
    image: "/images/ecommerce.jpg"
  },
  { 
    link: "/food-delivery", 
    text: "Food Delivery Applications",
    image: "/images/food-delivery.jpg"
  },
  { 
    link: "/fitness-tracker", 
    text: "Fitness Tracker Applications",
    image: "/images/fitness.jpg"
  },
  { 
    link: "/social-media", 
    text: "Social Media Applications",
    image: "/images/social-media.jpg"
  }
]

export default function Projects() {
  const container = useRef(null)

  return (
    <section ref={container} className={styles.projects}>
      <div className={styles.sectionHeader}>
        <h2>Recent Work</h2>
        <p>Explore my latest Flutter projects</p>
      </div>
      <div className={styles.flowingMenuContainer}>
        <FlowingMenu 
          items={projects}
          speed={15}
          textColor="#ffffff"
          bgColor="#000000"
          marqueeBgColor="#ffffff"
          marqueeTextColor="#000000"
          borderColor="#333333"
        />
      </div>
    </section>
  )
}
