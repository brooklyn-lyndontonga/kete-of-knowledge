// src/app/providers/ThemeProvider.jsx
import React, { createContext, useContext } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";
import { colors, spacing, radii, typography } from "../../theme";

const ThemeCtx = createContext(null);

export const useTheme = () => {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
};

const baseTheme = { colors, spacing, radii, typography, mode: "light" };

export function ThemeProvider({ children }) {
  return (
    <ThemeCtx.Provider value={{ theme: baseTheme }}>
      <StyledThemeProvider theme={baseTheme}>{children}</StyledThemeProvider>
    </ThemeCtx.Provider>
  );
}
