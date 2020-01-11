import React from "react"
import { AppProvider } from "./components/context"
import Header from "./components/header"
import "./App.css"

function App(props) {
  return (
    <AppProvider>
      <div className='App'>
        <Header />
      </div>
    </AppProvider>
  )
}

export default App
