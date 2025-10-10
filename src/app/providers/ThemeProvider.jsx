// src/app/providers/ThemeProvider.jsx
import React, { createContext, useContext } from "react"
import { colors, spacing, radii, typography } from "../../theme"

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const theme = { colors, spacing, radii, typography }
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
