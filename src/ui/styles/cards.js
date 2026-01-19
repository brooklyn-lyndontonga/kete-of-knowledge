import { StyleSheet } from "react-native"
import { colors, spacing, radius } from "../../theme"

export const cards = StyleSheet.create({
  card: {
    backgroundColor: colors.bgCard,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },

  soft: {
    backgroundColor: colors.accentSoft,
    borderWidth: 0,
  },
})
