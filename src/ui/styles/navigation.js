import { StyleSheet } from "react-native"
import { colors, spacing } from "../../theme"

export const navigation = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderColor: colors.borderLight,
    backgroundColor: colors.white,
  },

  item: {
    fontSize: 12,
    color: colors.textMuted,
  },

  active: {
    color: colors.accent,
    fontWeight: "600",
  },
})
