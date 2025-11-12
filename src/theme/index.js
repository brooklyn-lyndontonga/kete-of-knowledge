import { useMemo } from "react"

export const colors = {
  primary: "#267f53",
  secondary: "#99b7f5",
  accent1: "#f5793b",
  accent2: "#f296bd",
  accent3: "#fcca59",
  text: "#111111",
  mutedText: "#525252",
  bg: "#FFFFFF",
  card: "#F7F7F7",
  border: "#E8E8E8",
  teal: "#00B2A9",
  beige: "#EDE5CF",
  charcoal: "#333333",
  calmGreen: "#267F53",
  coral: "#F5793B",
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
}

export const radii = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
}

export const typography = {
  heading: "PlayfairDisplay_700Bold",
  body: "Poppins_400Regular",
  medium: "Poppins_500Medium",
  bold: "Poppins_700Bold",
  accent: "Quicksand_500Medium",
  display: "Raleway_700Bold",
}

// ✅ THIS IS THE CRITICAL PART
export function useTheme() {
  return useMemo(
    () => ({
      colors,
      spacing,
      radii,
      typography,
    }),
    []
  )
}
