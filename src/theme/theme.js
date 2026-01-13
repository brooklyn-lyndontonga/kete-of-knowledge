// =========================
// COLOURS
// =========================

export const colors = {
  // Core neutrals (foundation)
  ink: "#1A1A1A",        // Charcoal shadow (primary text)
  inkSoft: "#333333",   // Softer secondary text
  muted: "#6B6B6B",     // Helper / meta text

  background: "#FFFFFF", // Clean canvas
  surface: "#F7F7F7",    // Soft card / panel background
  divider: "#E5E5E5",    // Subtle structural lines

  // Accent (nature-aligned)
  accent: "#2E4A3A",     // Fern shadow green

  // State colours (soft, grounded, non-alarmist)
  success: "#3F6F58",    // Moss / healthy leaf
  warning: "#8A7A3C",    // Dry grass / seed pod
  error: "#7A3E3E",      // Clay / iron-rich soil
}

// =========================
// SPACING (8pt grid)
// =========================

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
}

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
}

export const elevation = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
}


// =========================
// RADIUS
// =========================

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
}

// =========================
// TYPOGRAPHY SCALE
// =========================

export const typography = {
  h1: 28,
  h2: 20,
  body: 16,
  small: 14,
  meta: 12,
}
