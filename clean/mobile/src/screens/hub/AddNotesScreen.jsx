/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { View, TextInput, Button } from "react-native"
import { useState } from "react"

import { addNote } from "../../features/notes.db.js"

export default function AddNoteScreen({ navigation }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  async function save() {
    if (!content) return

    await addNote({
      title,
      content,
    })

    navigation.goBack()
  }

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <TextInput
        placeholder="Title (optional)"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Write your note"
        value={content}
        onChangeText={setContent}
        multiline
        style={{ minHeight: 120 }}
      />
      <Button title="Save Note" onPress={save} />
    </View>
  )
}
