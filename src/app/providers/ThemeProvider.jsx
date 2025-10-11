import React, { createContext, useContext, useState, useEffect } from "react"
import { ThemeProvider as StyledThemeProvider } from "styled-components/native"

// 🎨 Define your base theme
const lightTheme = {
  mode: "light",
  colors: {
    primary: "#267f53",
    secondary: "#99b7f5",
    accent: "#f5793b",
    background: "#ffffff",
    text: "#000000",
  },
}

const darkTheme = {
  mode: "dark",
  colors: {
    primary: "#267f53",
    secondary: "#99b7f5",
    accent: "#f5793b",
    background: "#000000",
    text: "#ffffff",
  },
}

const ThemeCtx = createContext()
export const useTheme = () => useContext(ThemeCtx)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(lightTheme)

  const toggleTheme = () => {
    setTheme((prev) => (prev.mode === "light" ? darkTheme : lightTheme))
  }

  useEffect(() => {
    console.log("🎨 Current theme:", theme.mode)
  }, [theme])

  return (
    <ThemeCtx.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeCtx.Provider>
  )
}
