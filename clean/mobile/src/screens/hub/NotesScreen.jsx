/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { ScrollView, View, Text, Button } from "react-native"
import { useEffect, useState } from "react"
import { useIsFocused } from "@react-navigation/native"

import { getNotes } from "../../features/notes.db.js"

export default function NotesScreen({ navigation }) {
  const [items, setItems] = useState([])
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      getNotes().then((data) => setItems(data || []))
    }
  }, [isFocused])

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Button
        title="Add Note"
        onPress={() => navigation.navigate("AddNote")}
      />

      {items.length === 0 ? (
        <Text>No notes yet</Text>
      ) : (
        items.map((note) => (
          <View
            key={note.id}
            style={{
              padding: 12,
              backgroundColor: "#f3f3f3",
              borderRadius: 8,
            }}
          >
            {note.title ? (
              <Text style={{ fontWeight: "600" }}>{note.title}</Text>
            ) : null}
            <Text>{note.content}</Text>
          </View>
        ))
      )}
    </ScrollView>
  )
}
