/* eslint-disable react/react-in-jsx-scope */

import { View, Text, Pressable } from "react-native"
import { useEffect, useState } from "react"

import { getNotes, addNote, updateNote } from "../../features/notes.db.js"
import ProfileNotesModal from "./ProfileNotesModal"

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
    <View style={{ gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>Notes</Text>

      {notes.length === 0 && (
        <Text style={{ opacity: 0.6 }}>No notes yet</Text>
      )}

      {notes.map((note) => (
        <Pressable
          key={note.id}
          onPress={() => {
            setActiveNote(note)
            setModalOpen(true)
          }}
          style={{
            padding: 12,
            borderRadius: 10,
            backgroundColor: "#f3f3f3",
          }}
        >
          <Text numberOfLines={3}>{note.content}</Text>
        </Pressable>
      ))}

      {/* Add Note */}
      <Pressable
        onPress={() => {
          setActiveNote(null)
          setModalOpen(true)
        }}
        style={{
          padding: 12,
          borderRadius: 8,
          backgroundColor: "#ddd",
          alignItems: "center",
        }}
      >
        <Text>Add Note</Text>
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
