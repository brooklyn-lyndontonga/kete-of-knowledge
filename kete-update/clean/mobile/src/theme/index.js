export const colors = {
  // Curated Natural Green Palette
  olive: "#4A5E4E", // Calming, rich organic sage/olive (primary brand color)
  laurel: "#8FA38F", // Soft, dusty eucalyptus green (secondary brand color)
  cornsilk: "#F6F5F0", // Premium warm off-white linen background (clean and relaxing)
  meringue: "#EAE8DF", // Muted sandstone gray-green for highlight backgrounds
  camel: "#7E6D5D", // Earthy sand/camel for accent text (AA 4.53:1 on white)
  camelLight: "#C2A88F", // Original tint - decorative use only, not behind text
  orange: "#A5673E", // Terracotta orange for urgent notices (AA 4.53:1 with white text)
  orangeLight: "#D0824E", // Original tint - decorative use only, not behind text
  russet: "#7A624E", // Warm earthy clay brown for subtitle/secondary highlights
  text: "#2D362E", // Deep charcoal forest green (high contrast, premium legibility)
  muted: "#616B62", // Muted eucalyptus green-gray for labels (AA 4.5:1+ on all app surfaces)
  border: "#E2E0D5", // Delicate, ultra-thin border color
  card: "#FFFFFF", // Pure white for card backdrops (to create contrast on sand)
  surface: "#EFEFEA", // Soft clay sand background for inset elements
  white: "#FFFFFF",
}

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
}

export const radii = {
  sm: 12,
  md: 18, // Generous modern rounded corners
  lg: 24, // Sleek, organic card curves as seen in mockup
  pill: 999,
}

export const typography = {
  display: {
    fontFamily: "Manrope_700Bold",
    fontSize: 28,
    letterSpacing: -0.5, // Elegant tighter tracking for headings
  },
  title: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 20,
    letterSpacing: -0.2,
  },
  body: {
    fontFamily: "Manrope_400Regular",
    fontSize: 16,
    lineHeight: 22,
  },
  bodyStrong: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 16,
  },
  caption: {
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    letterSpacing: 0.2,
  },
}

export const shadow = {
  card: {
    shadowColor: "#4A5E4E", // Soft green-cast shadow for organic blending
    shadowOpacity: 0.05,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
}

export const a11y = {
  // Honour the reader's OS text size, capped so cards don't break apart.
  // Applied globally to Text and TextInput in App.js.
  maxFontSizeMultiplier: 1.6,
  // Minimum tappable size, per Apple HIG (44) and Material (48).
  minTouchTarget: 48,
}

export const layout = {
  screenPadding: 20, // Generous whitespace for premium breathability
}

export { images } from "./images"
