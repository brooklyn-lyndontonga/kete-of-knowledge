/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { View, Text, Pressable, StyleSheet } from "react-native"
import { colors, radii, shadow, spacing, typography } from "../../theme"

export default function RemindersPreview({ items = [], onAdd }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Reminders</Text>
          <Text style={styles.subtitle}>Whakamahara</Text>
        </View>
        <Pressable onPress={onAdd} style={styles.action}>
          <Text style={styles.actionText}>Add</Text>
        </Pressable>
      </View>

      {items.length === 0 ? (
        <Text style={styles.empty}>No reminders set for today</Text>
      ) : (
        items.map((item) => (
          <View
            key={item.id}
            style={styles.card}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            {item.time ? (
              <Text style={styles.cardMeta}>{item.time}</Text>
            ) : null}
          </View>
        ))
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  subtitle: {
    ...typography.caption,
    color: colors.muted,
  },
  action: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: colors.olive,
  },
  actionText: {
    ...typography.caption,
    color: colors.cornsilk,
  },
  empty: {
    ...typography.body,
    color: colors.muted,
  },
  card: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
  cardTitle: {
    ...typography.bodyStrong,
    color: colors.text,
  },
  cardMeta: {
    ...typography.caption,
    color: colors.muted,
  },
})
