import React from "react"
import { AppProvider } from "./components/context"
import Header from "./components/header"
import Pages from "./components/pages"
import Menu from "./components/menu"

import "./reset.css"
import "./app.css"

function App(props) {
  return (
    <AppProvider>
      <div className='app'>
        <Header />
        <Menu />
        <Pages />
      </div>
    </AppProvider>
  )
}

export default App
