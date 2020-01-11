import React, { useContext } from "react"
import { AppContext } from "./context"

import "./header.css"

function Header() {
  const { menu, setMenu } = useContext(AppContext)

  return (
    <div className='header'>
      <p className='title'>A:\drian payne</p>
      <button className='button' onClick={() => setMenu(!menu)}>
        X
      </button>
    </div>
  )
}

export default Header
