import React, { useState, createContext } from "react"

export const AppContext = createContext({})

export function AppProvider({ children }) {
  const [menu, setMenu] = useState(false)

  return <AppContext.Provider value={{ menu, setMenu }}>{children}</AppContext.Provider>
}
