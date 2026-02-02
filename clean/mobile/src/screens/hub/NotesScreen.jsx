/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native"
import { useEffect, useState } from "react"
import { useIsFocused } from "@react-navigation/native"

import { getNotes } from "../../features/notes.db.js"
import { colors, radii, shadow, spacing, typography } from "../../theme"

export default function NotesScreen({ navigation }) {
  const [items, setItems] = useState([])
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      getNotes().then((data) => setItems(data || []))
    }
  }, [isFocused])

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Notes</Text>
        <Text style={styles.subtitle}>Tuhipoka</Text>
      </View>
      <Pressable
        onPress={() => navigation.navigate("AddNote")}
        style={styles.primaryButton}
      >
        <Text style={styles.primaryText}>Add Note</Text>
      </Pressable>

      {items.length === 0 ? (
        <Text style={styles.empty}>No notes yet</Text>
      ) : (
        items.map((note) => (
          <View key={note.id} style={styles.card}>
            {note.title ? (
              <Text style={styles.cardTitle}>{note.title}</Text>
            ) : null}
            <Text style={styles.cardBody}>{note.content}</Text>
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
    gap: spacing.xs,
  },
  cardTitle: {
    ...typography.bodyStrong,
    color: colors.text,
  },
  cardBody: {
    ...typography.body,
    color: colors.text,
  },
})
