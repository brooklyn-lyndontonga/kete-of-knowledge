/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { View, Text, StyleSheet } from "react-native"
import { colors, radii, shadow, spacing, typography } from "../../theme"

export default function WhakataukiBanner({ text, translation }) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.kicker}>Whakataukī</Text>
        <View style={styles.pill}>
          <Text style={styles.pillText}>Māori · English</Text>
        </View>
      </View>
      <Text style={styles.title}>{text}</Text>
      <Text style={styles.subtitle}>{translation}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
    gap: spacing.xs,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  kicker: {
    ...typography.caption,
    color: colors.russet,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  pill: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radii.pill,
    backgroundColor: colors.meringue,
  },
  pillText: {
    ...typography.caption,
    color: colors.olive,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.muted,
  },
})
