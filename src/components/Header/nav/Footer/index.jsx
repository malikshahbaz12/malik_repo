import styles from './style.module.scss'
import Magnetic from '@/components/common/Magnetic'

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.row}>
        <Magnetic>
          <a href="mailto:malik.shahbaz@example.com">malik.shahbaz@example.com</a>
        </Magnetic>
        <Magnetic>
          <a href="tel:+923001234567">+92 300 1234567</a>
        </Magnetic>
      </div>
      <div className={styles.row}>
        <Magnetic>
          <a href="#">GitHub</a>
        </Magnetic>
        <Magnetic>
          <a href="#">LinkedIn</a>
        </Magnetic>
        <Magnetic>
          <a href="#">Twitter</a>
        </Magnetic>
        <Magnetic>
          <a href="#">Stack Overflow</a>
        </Magnetic>
      </div>
    </div>
  )
}
