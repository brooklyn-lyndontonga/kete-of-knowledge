import { StyleSheet } from "react-native"
import { colors } from "../../theme"

export const textStyles = StyleSheet.create({
  hero: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary,
    textAlign: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  body: {
    fontSize: 15,
    color: colors.textPrimary,
  },

  muted: {
    fontSize: 13,
    color: colors.textMuted,
  },

  small: {
    fontSize: 12,
    color: colors.textMuted,
  },
})
