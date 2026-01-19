import { StyleSheet } from "react-native"
import { spacing } from "../../theme"

export const headerStyles = StyleSheet.create({
  // Solid, full-bleed header background
  background: {
    width: "100%",
    backgroundColor: "#ffffff", // solid white
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.08)",
  },

  // Actual header content area
  content: {
    width: "100%",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,

    alignItems: "center",
    justifyContent: "center",
  },
})
