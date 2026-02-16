 
 
import { View, Text, StyleSheet } from "react-native"
import { colors, spacing, typography } from "../../theme"

export default function QuickView({ label, value }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  label: {
    ...typography.caption,
    color: colors.muted,
  },
  value: {
    ...typography.display,
    color: colors.olive,
  },
})
