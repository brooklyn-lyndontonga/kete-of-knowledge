import { ScrollView, Text, View, Pressable, StyleSheet } from "react-native"
import { useEffect, useState, useCallback } from "react"
import { useIsFocused } from "@react-navigation/native"
import { colors, radii, shadow, spacing, typography } from "../../theme"
import { useAuth } from "../../auth/AuthContext"
import { useAuthGuard } from "../../auth/useAuthGuard"
import { getChecklists, toggleChecklistItem } from "../../features/checklists.db.js"

export default function ChecklistsScreen({ navigation }) {
  const [checklists, setChecklists] = useState([])
  const [error, setError] = useState(false)
  const isFocused = useIsFocused()
  const { isGuest } = useAuth()
  const guard = useAuthGuard()

  const load = useCallback(async () => {
    try {
      const rows = await getChecklists()
      setChecklists(rows || [])
      setError(false)
    } catch (err) {
      console.error("Failed to load checklists:", err)
      setError(true)
    }
  }, [])

  useEffect(() => {
    if (isFocused) load()
  }, [isFocused, load])

  async function handleToggleItem(item) {
    try {
      await toggleChecklistItem(item.id, item.done === 0)
      load()
    } catch (err) {
      console.error("Failed to toggle checklist item:", err)
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title} accessibilityRole="header">Checklists</Text>
        <Text style={styles.subtitle}>Rārangi arowhai</Text>
      </View>
      <Pressable
        onPress={() => guard(() => navigation.navigate("AddChecklist"))}
        accessibilityRole="button"
        accessibilityLabel="Create checklist"
        style={({ pressed }) => [
          styles.primaryButton,
          (isGuest || pressed) && styles.primaryButtonDisabled,
        ]}
      >
        <Text style={styles.primaryText}>Create Checklist</Text>
      </Pressable>

      {error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{"Couldn't load your checklists."}</Text>
          <Pressable onPress={load} accessibilityRole="button" accessibilityLabel="Retry loading checklists">
            <Text style={styles.retryText}>Tap to retry</Text>
          </Pressable>
        </View>
      ) : checklists.length === 0 ? (
        <Text style={styles.empty}>No checklists yet</Text>
      ) : (
        checklists.map((list) => {
          const doneCount = list.items.filter((i) => i.done).length
          return (
            <View key={list.id} style={styles.card}>
              <Text style={styles.cardTitle}>{list.title}</Text>
              <Text style={styles.cardMeta}>
                {doneCount}/{list.items.length} done
              </Text>

              {list.items.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => handleToggleItem(item)}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: !!item.done }}
                  accessibilityLabel={item.label}
                  style={styles.itemRow}
                >
                  <Text style={styles.itemCheck}>{item.done ? "☑" : "☐"}</Text>
                  <Text
                    style={[styles.itemLabel, item.done && styles.itemLabelDone]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          )
        })
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
    gap: spacing.xs,
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
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: 4,
  },
  itemCheck: {
    ...typography.body,
    color: colors.olive,
  },
  itemLabel: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  itemLabelDone: {
    textDecorationLine: "line-through",
    color: colors.muted,
  },
})
