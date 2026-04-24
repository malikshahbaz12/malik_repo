export const slideUp = {
  initial: {
    y: "100%"
  },
  open: (i) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const delay = isMobile ? 0.008 * i : 0.01 * i
    return {
      y: "0%",
      transition: { duration: 0.5, delay }
    }
  },
  closed: {
    y: "100%",
    transition: { duration: 0.5 }
  }
}

export const opacity = {
  initial: {
    opacity: 0
  },
  open: {
    opacity: 1,
    transition: { duration: 0.5 }
  },
  closed: {
    opacity: 0,
    transition: { duration: 0.5 }
  }
}
