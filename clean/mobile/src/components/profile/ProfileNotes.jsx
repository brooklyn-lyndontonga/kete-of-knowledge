/* eslint-disable react/react-in-jsx-scope */

import { View, Text, Pressable, StyleSheet } from "react-native"
import { useEffect, useState } from "react"

import { getNotes, addNote, updateNote } from "../../features/notes.db.js"
import ProfileNotesModal from "./ProfileNotesModal"
import { colors, radii, shadow, spacing, typography } from "../../theme"

export default function ProfileNotes() {
  const [notes, setNotes] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [activeNote, setActiveNote] = useState(null)

  async function load() {
    const data = await getNotes()
    setNotes(data || [])
  }

  useEffect(() => {
    load()
  }, [])

  async function handleSave(text) {
    if (!text.trim()) return

    if (activeNote) {
      await updateNote({
        id: activeNote.id,
        content: text,
      })
    } else {
      await addNote({
        content: text,
      })
    }

    setActiveNote(null)
    setModalOpen(false)
    load()
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Notes</Text>
        <Text style={styles.subtitle}>Tuhipoka</Text>
      </View>

      {notes.length === 0 && (
        <Text style={styles.empty}>No notes yet</Text>
      )}

      {notes.map((note) => (
        <Pressable
          key={note.id}
          onPress={() => {
            setActiveNote(note)
            setModalOpen(true)
          }}
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPressed,
          ]}
        >
          <Text numberOfLines={3} style={styles.cardText}>
            {note.content}
          </Text>
        </Pressable>
      ))}

      {/* Add Note */}
      <Pressable
        onPress={() => {
          setActiveNote(null)
          setModalOpen(true)
        }}
        style={({ pressed }) => [
          styles.addButton,
          pressed && styles.cardPressed,
        ]}
      >
        <Text style={styles.addText}>Add Note</Text>
      </Pressable>

      <ProfileNotesModal
        visible={modalOpen}
        initialValue={activeNote?.content || ""}
        onClose={() => {
          setActiveNote(null)
          setModalOpen(false)
        }}
        onSave={handleSave}
      />
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
  card: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
  cardPressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.92,
  },
  cardText: {
    ...typography.body,
    color: colors.text,
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
})
