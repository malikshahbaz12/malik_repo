import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Magnetic({ children }) {
  const magnetic = useRef(null)

  useEffect(() => {
    // Disable magnetic effect on mobile
    if (window.innerWidth < 768) {
      return
    }

    // Reduce pull factor on tablet
    const pullFactor = window.innerWidth < 1024 ? 0.2 : 0.35

    const xTo = gsap.quickTo(magnetic.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" })
    const yTo = gsap.quickTo(magnetic.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" })

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { height, width, left, top } = magnetic.current.getBoundingClientRect()
      const x = clientX - (left + width / 2)
      const y = clientY - (top + height / 2)
      xTo(x * pullFactor)
      yTo(y * pullFactor)
    }

    const handleMouseLeave = () => {
      xTo(0)
      yTo(0)
    }

    const handleResize = () => {
      if (window.innerWidth < 768) {
        xTo(0)
        yTo(0)
      }
    }

    magnetic.current.addEventListener('mousemove', handleMouseMove)
    magnetic.current.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', handleResize)

    return () => {
      if (magnetic.current) {
        magnetic.current.removeEventListener('mousemove', handleMouseMove)
        magnetic.current.removeEventListener('mouseleave', handleMouseLeave)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return React.cloneElement(children, { ref: magnetic })
}
