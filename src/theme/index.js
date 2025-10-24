// src/theme/index.js
import { useMemo } from 'react'

export const colors = {
  // 🌿 Base palette
  primary: '#267f53',       // Deep green (grounding)
  secondary: '#99b7f5',     // Sky blue (calm balance)
  accent1: '#f5793b',       // Orange (vitality)
  accent2: '#f296bd',       // Pink (whānau, aroha)
  accent3: '#fcca59',       // Yellow (energy, sunlight)
  text: '#111111',
  mutedText: '#525252',
  bg: '#FFFFFF',
  card: '#F7F7F7',
  border: '#E8E8E8',

  // 💧 Manawaora additions
  teal: '#00B2A9',          // New brand tone
  beige: '#EDE5CF',         // Warm neutral
  charcoal: '#333333',      // Strong contrast
  calmGreen: '#267F53',     // Support tone
  coral: '#F5793B',         // Accent consistency
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
}

export const radii = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
}

export const typography = {
  heading: 'PlayfairDisplay_700Bold', // Elegant serif
  body: 'Poppins_400Regular',         // Clean and readable
  medium: 'Poppins_500Medium',
  bold: 'Poppins_700Bold',
  accent: 'Quicksand_500Medium',      // Soft and rounded
  display: 'Raleway_700Bold',         // Optional display font
}

// ✅ Hook to access theme throughout the app
export function useTheme() {
  return useMemo(() => ({
    colors,
    spacing,
    radii,
    typography,
  }), [])
}
