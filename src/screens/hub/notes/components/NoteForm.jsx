/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { View, TextInput, Button } from "react-native"
import { useEffect, useState } from "react"
import { API_URL } from "../../../../lib/api"

export default function NoteForm({
  editingNote,
  onSaved,
  onCancel,
}) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title)
      setContent(editingNote.content || "")
    }
  }, [editingNote])

  async function handleSubmit() {
    const payload = { title, content }

    if (editingNote) {
      await fetch(`${API_URL}/notes/${editingNote.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    } else {
      await fetch(`${API_URL}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    }

    setTitle("")
    setContent("")
    onSaved()
  }

  return (
    <View>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Write your note…"
        value={content}
        onChangeText={setContent}
        multiline
      />

      <Button
        title={editingNote ? "Update note" : "Save note"}
        onPress={handleSubmit}
      />

      {editingNote && (
        <Button title="Cancel" onPress={onCancel} />
      )}
    </View>
  )
}
