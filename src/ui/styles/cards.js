import { StyleSheet } from "react-native"
import { spacing, radius } from "../../theme"

export const cards = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.92)", // translucent
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.05)",
  },

  soft: {
    backgroundColor: "rgba(255, 255, 255, 0.85)", // more translucent
    borderWidth: 0,
  },
})
