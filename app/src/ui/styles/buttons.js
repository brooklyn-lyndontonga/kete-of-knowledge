import { StyleSheet } from "react-native"
import { colors, spacing, radius } from "../../theme"

export const buttons = StyleSheet.create({
  primary: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },

  outline: {
    borderWidth: 1,
    borderColor: colors.borderLight,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },

  pill: {
    borderRadius: radius.pill,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
})
