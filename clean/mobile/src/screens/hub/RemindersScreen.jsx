import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { useCallback, useState } from "react"
import { useFocusEffect } from "@react-navigation/native"

import {
  deleteReminder,
  getReminders,
  toggleReminder,
} from "../../features/reminders.db.js"
import { isAvailable } from "../../features/notifications"
import { colors, radii, shadow, spacing, typography } from "../../theme"
import { useAuth } from "../../auth/AuthContext"
import { useAuthGuard } from "../../auth/useAuthGuard"
import { useLanguage } from "../../i18n/LanguageContext"

export default function RemindersScreen({ navigation }) {
  const [reminders, setReminders] = useState([])
  const [alertsOn, setAlertsOn] = useState(true)
  const { isGuest } = useAuth()
  const guard = useAuthGuard()
  const { t } = useLanguage()

  const load = useCallback(() => {
    getReminders()
      .then((rows) => setReminders(rows || []))
      .catch((err) => console.warn("Could not load reminders:", err?.message))
    isAvailable().then(setAlertsOn)
  }, [])

  useFocusEffect(
    useCallback(() => {
      load()
    }, [load])
  )

  function confirmDelete(reminder) {
    Alert.alert("Delete reminder", `Delete "${reminder.title}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteReminder(reminder.id).then(load),
      },
    ])
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title} accessibilityRole="header">
          {t("reminders.title")}
        </Text>
      </View>

      {!alertsOn ? (
        <Text style={styles.notice}>{t("reminders.alertsOff")}</Text>
      ) : null}

      <Pressable
        onPress={() => guard(() => navigation.navigate("AddReminder"))}
        style={({ pressed }) => [
          styles.primaryButton,
          (isGuest || pressed) && styles.primaryButtonDisabled,
        ]}
        accessibilityRole="button"
      >
        <Text style={styles.primaryText}>{t("reminders.add")}</Text>
      </Pressable>

      {reminders.length === 0 ? (
        <Text style={styles.empty}>{t("reminders.empty")}</Text>
      ) : (
        reminders.map((item) => (
          <View
            key={item.id}
            style={[styles.card, !item.active && styles.cardInactive]}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardMeta}>
              {item.time_of_day
                ? `${t("reminders.dailyAt")} ${item.time_of_day}`
                : t("reminders.noTime")}
            </Text>
            {item.notes ? (
              <Text style={styles.cardNotes}>{item.notes}</Text>
            ) : null}

            <View style={styles.actions}>
              <Pressable
                onPress={() =>
                  guard(() => toggleReminder(item.id, !item.active).then(load))
                }
                style={({ pressed }) => [
                  styles.smallButton,
                  pressed && styles.primaryButtonDisabled,
                ]}
                accessibilityRole="button"
                accessibilityLabel={
                  item.active
                    ? `Pause reminder ${item.title}`
                    : `Resume reminder ${item.title}`
                }
              >
                <Text style={styles.smallText}>
                  {item.active ? t("action.pause") : t("action.resume")}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => guard(() => confirmDelete(item))}
                style={({ pressed }) => [
                  styles.smallButtonMuted,
                  pressed && styles.primaryButtonDisabled,
                ]}
                accessibilityRole="button"
                accessibilityLabel={`Delete reminder ${item.title}`}
              >
                <Text style={styles.smallTextMuted}>{t("action.delete")}</Text>
              </Pressable>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.cornsilk },
  content: { padding: 20, gap: spacing.md, paddingBottom: 40 },
  header: { gap: spacing.xs },
  title: { ...typography.display, color: colors.olive },
  subtitle: { ...typography.caption, color: colors.muted },
  notice: {
    ...typography.caption,
    color: colors.russet,
    backgroundColor: colors.meringue,
    borderRadius: radii.md,
    padding: spacing.sm,
  },
  primaryButton: {
    backgroundColor: colors.olive,
    borderRadius: radii.pill,
    paddingVertical: spacing.sm,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonDisabled: { opacity: 0.7 },
  primaryText: { ...typography.bodyStrong, color: colors.cornsilk },
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.xs,
    ...shadow.card,
  },
  cardInactive: { opacity: 0.6 },
  cardTitle: { ...typography.bodyStrong, color: colors.text },
  cardMeta: { ...typography.caption, color: colors.muted },
  cardNotes: { ...typography.body, color: colors.muted },
  actions: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.xs },
  smallButton: {
    backgroundColor: colors.olive,
    borderRadius: radii.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    minHeight: 44,
    justifyContent: "center",
  },
  smallText: { ...typography.bodyStrong, color: colors.cornsilk },
  smallButtonMuted: {
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    minHeight: 44,
    justifyContent: "center",
  },
  smallTextMuted: { ...typography.bodyStrong, color: colors.russet },
  empty: { ...typography.body, color: colors.muted, textAlign: "center" },
})
