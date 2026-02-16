/* eslint-disable no-unused-vars */
 
 
import { ScrollView, Text, View, Pressable, StyleSheet } from "react-native"
import { useState } from "react"
import { colors, radii, shadow, spacing, typography } from "../../theme"
import { useAuth } from "../../auth/AuthContext"
import { useAuthGuard } from "../../auth/useAuthGuard"

export default function RemindersScreen({ navigation }) {
  // MVP: local-only reminders
  const [reminders, setReminders] = useState([])
  const { isGuest } = useAuth()
  const guard = useAuthGuard()

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Reminders</Text>
        <Text style={styles.subtitle}>Whakamahara</Text>
      </View>
      <Pressable
        onPress={() => guard(() => navigation.navigate("AddReminder"))}
        style={({ pressed }) => [
          styles.primaryButton,
          (isGuest || pressed) && styles.primaryButtonDisabled,
        ]}
      >
        <Text style={styles.primaryText}>Add Reminder</Text>
      </Pressable>

      {reminders.length === 0 ? (
        <Text style={styles.empty}>No reminders yet</Text>
      ) : (
        reminders.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardMeta}>{item.time}</Text>
            {item.notes ? (
              <Text style={styles.cardNotes}>{item.notes}</Text>
            ) : null}
          </View>
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
  card: {
    padding: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radii.md,
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
  cardNotes: {
    ...typography.body,
    color: colors.text,
    marginTop: 6,
  },
})
