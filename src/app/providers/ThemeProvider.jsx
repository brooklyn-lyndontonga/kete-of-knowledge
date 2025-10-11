import React, { createContext, useContext, useState, useEffect } from "react"
import { ThemeProvider as StyledThemeProvider } from "styled-components/native"
import { colors, spacing, radii, typography } from "../../theme"

const ThemeCtx = createContext({ theme: "light", toggle: () => {} })
export const useTheme = () => useContext(ThemeCtx)

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState("light")
  const toggle = () => setThemeMode(themeMode === "light" ? "dark" : "light")

  const theme = { colors, spacing, radii, typography }

  useEffect(() => {
    console.log("🎨 Current theme:", themeMode)
  }, [themeMode])

  return (
    <ThemeCtx.Provider value={{ themeMode, toggle }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeCtx.Provider>
  )
}
