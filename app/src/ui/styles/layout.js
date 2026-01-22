import { StyleSheet } from "react-native"
import { spacing } from "../../theme"

export const layout = StyleSheet.create({
  screen: {
    flex: 1,
    padding: spacing.lg,
  },

  stack: {
    gap: spacing.lg,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },

  spaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  center: {
    alignItems: "center",
    justifyContent: "center",
  },
})
