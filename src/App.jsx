import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Work from './pages/Work'
import Contact from './pages/Contact'
import PageTransition from './components/PageTransition'

function App() {
  const location = useLocation()

  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
