/* eslint-disable react/prop-types */
import React, { createContext, useContext } from "react"
import { ThemeProvider as StyledThemeProvider } from "styled-components/native"
import { colors, spacing, radii, typography } from "../../theme"

const ThemeContext = createContext(null)

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return ctx
}

const theme = {
  colors,
  spacing,
  radii,
  typography,
}

export function ThemeProvider({ children }) {
  return (
    <ThemeContext.Provider value={theme}>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
