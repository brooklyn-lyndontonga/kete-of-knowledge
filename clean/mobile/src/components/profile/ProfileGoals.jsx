/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { View, Text, Pressable, StyleSheet } from "react-native"
import { colors, radii, shadow, spacing, typography } from "../../theme"

export default function ProfileGoals({ goals = [], onToggle, onAdd }) {
  const active = goals.filter((g) => g.active === 1)
  const achieved = goals.filter((g) => g.active === 0)

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>My Goals</Text>
        <Text style={styles.subtitle}>Ngā whāinga</Text>
      </View>

      {/* Active goals */}
      {active.length === 0 ? (
        <Text style={styles.empty}>No active goals</Text>
      ) : (
        active.map((goal) => (
          <Pressable
            key={goal.id}
            onPress={() => onToggle(goal)}
            style={({ pressed }) => [
              styles.goalCard,
              pressed && styles.cardPressed,
            ]}
          >
            <Text style={styles.goalTitle}>{goal.title}</Text>
            {goal.description ? (
              <Text style={styles.goalBody}>{goal.description}</Text>
            ) : null}
          </Pressable>
        ))
      )}

      {/* Add */}
      <Pressable
        onPress={onAdd}
        style={({ pressed }) => [
          styles.addButton,
          pressed && styles.cardPressed,
        ]}
      >
        <Text style={styles.addText}>Add Goal</Text>
      </Pressable>

      {/* Achieved */}
      {achieved.length > 0 && (
        <View style={styles.achieved}>
          <Text style={styles.achievedTitle}>Achieved</Text>
          {achieved.map((goal) => (
            <Pressable
              key={goal.id}
              onPress={() => onToggle(goal)}
            >
              <Text style={styles.achievedItem}>
                {goal.title}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  subtitle: {
    ...typography.caption,
    color: colors.muted,
  },
  empty: {
    ...typography.body,
    color: colors.muted,
  },
  goalCard: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
  cardPressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.92,
  },
  goalTitle: {
    ...typography.bodyStrong,
    color: colors.text,
  },
  goalBody: {
    ...typography.body,
    color: colors.muted,
    marginTop: 4,
  },
  addButton: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.olive,
    alignItems: "center",
  },
  addText: {
    ...typography.bodyStrong,
    color: colors.cornsilk,
  },
  achieved: {
    gap: spacing.xs,
  },
  achievedTitle: {
    ...typography.bodyStrong,
    color: colors.text,
  },
  achievedItem: {
    ...typography.body,
    color: colors.muted,
    textDecorationLine: "line-through",
  },
})
