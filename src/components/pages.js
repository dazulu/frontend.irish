import React, { useContext, useEffect } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { AppContext } from "./context"
import Home from "../pages/home"

function Pages() {
  const { menu } = useContext(AppContext)
  const pageControls = useAnimation()

  const pageVariants = {
    initial: {
      x: 0,
      y: 0,
      z: 0,
      height: "100vh",
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      overflow: "initial",
      transition: {
        ease: "easeOut"
      }
    },
    slide: {
      y: 50,
      x: -200,
      z: -100,
      height: "95vh",
      borderTopRightRadius: 40,
      borderBottomRightRadius: 40,
      overflow: "hidden",
      transition: {
        type: "spring",
        mass: 0.5,
        velocity: 10
      }
    }
  }

  const slide = async () => {
    document.querySelector("body").style.overflow = "hidden"
    pageControls.start("slide")
  }

  const reset = async () => {
    await pageControls.start("initial")
    document.querySelector("body").style.overflow = "initial"
  }

  useEffect(() => {
    menu ? slide() : reset()
  })

  return (
    <motion.div animate={pageControls} variants={pageVariants} className='full-height'>
      <Home />
    </motion.div>
  )
}

export default Pages
