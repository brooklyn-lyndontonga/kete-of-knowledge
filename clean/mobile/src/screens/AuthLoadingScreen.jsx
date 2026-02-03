/* eslint-disable react/react-in-jsx-scope */
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import { colors, spacing, typography } from "../theme"

export default function AuthLoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.olive} />
      <Text style={styles.title}>Signing you in…</Text>
      <Text style={styles.subtitle}>Whakamanahia tō takiuru</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cornsilk,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  title: {
    ...typography.bodyStrong,
    color: colors.text,
  },
  subtitle: {
    ...typography.caption,
    color: colors.muted,
  },
})
