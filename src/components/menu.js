import React, { useContext, useEffect } from "react"
import { useAnimation, motion } from "framer-motion"
import { AppContext } from "./context"

import "./menu.css"

function Menu() {
  const { menu } = useContext(AppContext)
  const menuControls = useAnimation()

  const menuVariants = {
    initial: {
      x: 150,
      transition: {
        ease: "easeOut"
      }
    },
    open: {
      x: -100,
      transition: {
        type: "spring",
        mass: 0.5,
        velocity: 3,
        stiffness: 90
      }
    }
  }
  useEffect(() => {
    menu ? menuControls.start("open") : menuControls.start("initial")
  })

  return (
    <motion.div animate={menuControls} variants={menuVariants}>
      <nav className='menu'>
        <li className='menu__item'>
          <a className='menu__link' href='#1'>
            Home
          </a>
        </li>
        <li className='menu__item'>
          <a className='menu__link' href='#2'>
            Blog
          </a>
        </li>
        <li className='menu__item'>
          <a className='menu__link' href='#3'>
            About
          </a>
        </li>
        <li className='menu__item'>
          <a className='menu__link' href='#4'>
            Skills
          </a>
        </li>
        <li className='menu__item'>
          <a className='menu__link' href='#5'>
            Contact
          </a>
        </li>
      </nav>
    </motion.div>
  )
}

export default Menu
