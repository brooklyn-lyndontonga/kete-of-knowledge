import { StyleSheet } from "react-native"
import { colors, typography } from "./theme"

export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  text: {
    fontSize: typography.body,
    color: colors.ink,
    lineHeight: 24,
  },
  mutedText: {
    fontSize: typography.small,
    color: colors.muted,
  },
})
