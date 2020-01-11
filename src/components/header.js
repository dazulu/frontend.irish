import React, { useContext } from "react"
import { AppContext } from "./context"

import "./header.css"

function Header() {
  const { menu, setMenu } = useContext(AppContext)

  const handleOnClick = () => {
    const body = document.querySelector("body")

    body.classList.toggle("menu--open")
    setMenu(!menu)
  }

  return (
    <div className='header'>
      <p className='name'>A:\drian payne</p>
      <button className='menu-button' onClick={handleOnClick}>
        <div />
        <div />
        <div />
      </button>
    </div>
  )
}

export default Header
