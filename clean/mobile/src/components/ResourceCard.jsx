/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { View, Text, StyleSheet } from "react-native"
import { colors, radii, shadow, spacing, typography } from "../theme"

export default function ResourceCard({ item }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.body}>{item.description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    ...shadow.card,
  },
  title: {
    ...typography.bodyStrong,
    color: colors.text,
  },
  body: {
    ...typography.body,
    color: colors.muted,
    marginTop: 4,
  },
})
