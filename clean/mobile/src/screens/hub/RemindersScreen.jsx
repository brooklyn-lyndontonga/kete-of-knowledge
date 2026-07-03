import { ScrollView, Text, View, Pressable, StyleSheet } from "react-native"
import { useEffect, useState, useCallback } from "react"
import { useIsFocused } from "@react-navigation/native"
import { colors, radii, shadow, spacing, typography } from "../../theme"
import { useAuth } from "../../auth/AuthContext"
import { useAuthGuard } from "../../auth/useAuthGuard"
import { getReminders, toggleReminder } from "../../features/reminders.db.js"

export default function RemindersScreen({ navigation }) {
  const [reminders, setReminders] = useState([])
  const [error, setError] = useState(false)
  const isFocused = useIsFocused()
  const { isGuest } = useAuth()
  const guard = useAuthGuard()

  const load = useCallback(async () => {
    try {
      const rows = await getReminders()
      setReminders(rows || [])
      setError(false)
    } catch (err) {
      console.error("Failed to load reminders:", err)
      setError(true)
    }
  }, [])

  useEffect(() => {
    if (isFocused) load()
  }, [isFocused, load])

  async function handleToggle(reminder) {
    try {
      await toggleReminder(reminder.id, reminder.active === 0)
      load()
    } catch (err) {
      console.error("Failed to toggle reminder:", err)
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title} accessibilityRole="header">Reminders</Text>
        <Text style={styles.subtitle}>Whakamahara</Text>
      </View>
      <Pressable
        onPress={() => guard(() => navigation.navigate("AddReminder"))}
        accessibilityRole="button"
        accessibilityLabel="Add reminder"
        style={({ pressed }) => [
          styles.primaryButton,
          (isGuest || pressed) && styles.primaryButtonDisabled,
        ]}
      >
        <Text style={styles.primaryText}>Add Reminder</Text>
      </Pressable>

      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{"Couldn't load your reminders."}</Text>
          <Pressable onPress={load} accessibilityRole="button" accessibilityLabel="Retry loading reminders">
            <Text style={styles.retryText}>Tap to retry</Text>
          </Pressable>
        </View>
      ) : reminders.length === 0 ? (
        <Text style={styles.empty}>No reminders yet</Text>
      ) : (
        reminders.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => handleToggle(item)}
            accessibilityRole="button"
            accessibilityLabel={`${item.title}, ${item.active ? "active" : "paused"}. Tap to ${item.active ? "pause" : "resume"}.`}
            style={[styles.card, item.active === 0 && styles.cardInactive]}
          >
            <View style={styles.cardRow}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardBadge}>
                {item.active ? "Active" : "Paused"}
              </Text>
            </View>
            {item.schedule ? (
              <Text style={styles.cardMeta}>{item.schedule}</Text>
            ) : null}
            {item.notes ? (
              <Text style={styles.cardNotes}>{item.notes}</Text>
            ) : null}
          </Pressable>
        ))
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.cornsilk,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: 40,
  },
  header: {
    gap: spacing.xs,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  subtitle: {
    ...typography.caption,
    color: colors.muted,
  },
  primaryButton: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.olive,
    alignItems: "center",
  },
  primaryButtonDisabled: {
    opacity: 0.6,
  },
  primaryText: {
    ...typography.bodyStrong,
    color: colors.cornsilk,
  },
  empty: {
    ...typography.body,
    color: colors.muted,
  },
  errorBox: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
    alignItems: "center",
  },
  errorText: {
    ...typography.body,
    color: colors.text,
  },
  retryText: {
    ...typography.bodyStrong,
    color: colors.olive,
  },
  card: {
    padding: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
  cardInactive: {
    opacity: 0.55,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    ...typography.bodyStrong,
    color: colors.text,
  },
  cardBadge: {
    ...typography.caption,
    color: colors.muted,
  },
  cardMeta: {
    ...typography.caption,
    color: colors.muted,
  },
  cardNotes: {
    ...typography.body,
    color: colors.text,
    marginTop: 6,
  },
})
