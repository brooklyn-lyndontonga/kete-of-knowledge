import { View, Text, StyleSheet } from "react-native"
import { colors, radii, shadow, spacing, typography } from "../../theme"

export default function WhakataukiBanner({ text, translation }) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Whakataukī</Text>
        </View>
        <Text style={styles.topLabel}>Grounding Reflection</Text>
      </View>
      <Text style={styles.title}>“{text}”</Text>
      <View style={styles.divider} />
      <Text style={styles.subtitle}>{translation}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.olive, // Rich deep green background
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    ...shadow.card,
    gap: spacing.sm,
    overflow: "hidden",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radii.pill,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  badgeText: {
    ...typography.caption,
    fontFamily: "Manrope_600SemiBold",
    color: colors.cornsilk,
    textTransform: "uppercase",
    fontSize: 11,
    letterSpacing: 0.8,
  },
  topLabel: {
    ...typography.caption,
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 12,
  },
  title: {
    ...typography.title,
    color: colors.cornsilk, // Warm off-white
    fontSize: 22,
    lineHeight: 30,
    fontStyle: "italic",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    marginVertical: 4,
  },
  subtitle: {
    ...typography.body,
    color: "rgba(246, 245, 240, 0.8)", // Soft readable sub-text
    fontSize: 15,
    lineHeight: 22,
  },
})
