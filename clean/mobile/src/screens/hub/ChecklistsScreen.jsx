import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { useCallback, useState } from "react"
import { useFocusEffect } from "@react-navigation/native"

import {
  deleteChecklist,
  getChecklists,
  toggleChecklistItem,
} from "../../features/checklists.db"
import { colors, radii, shadow, spacing, typography } from "../../theme"
import { useAuth } from "../../auth/AuthContext"
import { useAuthGuard } from "../../auth/useAuthGuard"

export default function ChecklistsScreen({ navigation }) {
  const [checklists, setChecklists] = useState([])
  const { isGuest } = useAuth()
  const guard = useAuthGuard()

  const load = useCallback(() => {
    getChecklists()
      .then((rows) => setChecklists(rows || []))
      .catch((err) => console.warn("Could not load checklists:", err?.message))
  }, [])

  useFocusEffect(
    useCallback(() => {
      load()
    }, [load])
  )

  function confirmDelete(list) {
    Alert.alert("Delete checklist", `Delete "${list.title}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteChecklist(list.id).then(load),
      },
    ])
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Checklists</Text>
        <Text style={styles.subtitle}>Rārangi arowhai</Text>
      </View>

      <Pressable
        onPress={() => guard(() => navigation.navigate("AddChecklist"))}
        style={({ pressed }) => [
          styles.primaryButton,
          (isGuest || pressed) && styles.buttonPressed,
        ]}
      >
        <Text style={styles.primaryText}>Create Checklist</Text>
      </Pressable>

      {checklists.length === 0 ? (
        <Text style={styles.empty}>No checklists yet</Text>
      ) : (
        checklists.map((list) => {
          const done = list.items.filter((i) => i.done).length
          return (
            <View key={list.id} style={styles.card}>
              <Text style={styles.cardTitle}>{list.title}</Text>
              <Text style={styles.cardMeta}>
                {done} of {list.items.length} done
              </Text>

              {list.items.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() =>
                    guard(() =>
                      toggleChecklistItem(item.id, !item.done).then(load)
                    )
                  }
                  style={({ pressed }) => [
                    styles.item,
                    pressed && styles.buttonPressed,
                  ]}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: Boolean(item.done) }}
                  accessibilityLabel={item.label}
                >
                  <Text style={styles.itemBox}>{item.done ? "☑" : "☐"}</Text>
                  <Text
                    style={[styles.itemText, item.done && styles.itemTextDone]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              ))}

              <Pressable
                onPress={() => guard(() => confirmDelete(list))}
                style={({ pressed }) => [
                  styles.deleteButton,
                  pressed && styles.buttonPressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel={`Delete checklist ${list.title}`}
              >
                <Text style={styles.deleteText}>Delete list</Text>
              </Pressable>
            </View>
          )
        })
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
  primaryButton: {
    backgroundColor: colors.olive,
    borderRadius: radii.pill,
    paddingVertical: spacing.sm,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: { opacity: 0.7 },
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
  cardTitle: { ...typography.title, color: colors.text },
  cardMeta: { ...typography.caption, color: colors.muted },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    minHeight: 44,
  },
  itemBox: { fontSize: 20, color: colors.olive },
  itemText: { ...typography.body, color: colors.text, flexShrink: 1 },
  itemTextDone: { color: colors.muted, textDecorationLine: "line-through" },
  deleteButton: {
    alignSelf: "flex-start",
    backgroundColor: colors.surface,
    borderRadius: radii.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    minHeight: 44,
    justifyContent: "center",
    marginTop: spacing.xs,
  },
  deleteText: { ...typography.bodyStrong, color: colors.russet },
  empty: { ...typography.body, color: colors.muted, textAlign: "center" },
})
