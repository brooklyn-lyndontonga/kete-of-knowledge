/* eslint-disable no-irregular-whitespace */
import React, { useState } from "react"
import { View, TextInput, FlatList, Text, Pressable } from "react-native"
import { useAppData } from "../../../app/providers/AppDataProvider"

export default function NotesScreen() {
  const { notes, addNote, deleteNote } = useAppData()
  const [text, setText] = useState("")

  const handleAddNote = () => {
    addNote({ id: Date.now(), text })
    setText("")
  }

  const handleDeleteNote = (noteId) => {
    deleteNote(noteId)
  }

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Write a note…"
        value={text}
        onChangeText={setText}
      />

      <Pressable onPress={handleAddNote}>
        <Text>　Add</Text>
      </Pressable>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.text}</Text>
            <Pressable onPress={() => handleDeleteNote(item.id)}>
              <Text style={{ color: "red" }}>Delete</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  )
}