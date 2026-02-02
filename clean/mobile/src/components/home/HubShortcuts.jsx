/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { View, Text, Pressable, StyleSheet } from "react-native"
import { colors, radii, shadow, spacing, typography } from "../../theme"

export default function HubShortcuts({ onNavigate }) {
  const items = [
    { label: "Symptoms", subtitle: "Tohumate" },
    { label: "Rongoā", subtitle: "Medicines" },
    { label: "Notes", subtitle: "Tuhipoka" },
    { label: "Checklists", subtitle: "Rārangi arowhai" },
  ]

  return (
    <View style={styles.wrap}>
      {items.map((item) => (
        <Pressable
          key={item.label}
          onPress={() => onNavigate(item.label)}
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPressed,
          ]}
        >
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </Pressable>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  card: {
    padding: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: "47%",
    ...shadow.card,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  label: {
    ...typography.bodyStrong,
    color: colors.text,
  },
  subtitle: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 2,
  },
})
