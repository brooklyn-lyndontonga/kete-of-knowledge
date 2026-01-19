/* eslint-disable react/react-in-jsx-scope */
import { FlatList, Text, View } from "react-native"
import { useEffect, useState } from "react"
import { API_URL } from "../../../lib/api"
import NoteForm from "./components/NoteForm"
import NoteItem from "./components/NoteItem"

export default function NotesScreen() {
  const [notes, setNotes] = useState([])
  const [editingNote, setEditingNote] = useState(null)

  useEffect(() => {
    fetchNotes()
  }, [])

  async function fetchNotes() {
    const res = await fetch(`${API_URL}/notes`)
    const data = await res.json()
    setNotes(data)
  }

  async function handleDelete(id) {
    await fetch(`${API_URL}/notes/${id}`, {
      method: "DELETE",
    })
    fetchNotes()
  }

  return (
    <FlatList
      data={notes}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 16 }}
      ListHeaderComponent={
        <View>
          <Text style={{ fontSize: 20, marginBottom: 8 }}>
            Notes
          </Text>

          <NoteForm
            editingNote={editingNote}
            onSaved={() => {
              setEditingNote(null)
              fetchNotes()
            }}
            onCancel={() => setEditingNote(null)}
          />

          <Text style={{ marginTop: 24, fontWeight: "600" }}>
            History
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <NoteItem
          note={item}
          onEdit={() => setEditingNote(item)}
          onDelete={() => handleDelete(item.id)}
        />
      )}
    />
  )
}
