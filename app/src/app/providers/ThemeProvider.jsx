/* eslint-disable react/prop-types */
import React, { createContext, useContext } from "react"

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const theme = {
    colors: {
      background: "#FFFFFF",
      card: "#F6F6F6",
      primary: "#1F7A5C",
      mutedText: "#666666",
    },
    spacing: {
      sm: 8,
      md: 12,
      lg: 16,
    },
    typography: {
      heading: "System",
      body: "System",
    },
  }

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return ctx
}
