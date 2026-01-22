/* eslint-disable react/react-in-jsx-scope */
import { View, Text, FlatList } from "react-native"
import { useEffect, useState } from "react"
import { API_URL } from "../../../../lib/api"


export default function NoteList() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetchNotes()
  }, [])

  async function fetchNotes() {
    const res = await fetch(`${API_URL}/notes`)
    const data = await res.json()
    setNotes(data)
  }

  return (
    <View>
      <Text style={{ fontWeight: "600", marginBottom: 8 }}>
        History
      </Text>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontWeight: "500" }}>{item.title}</Text>
            {item.content && <Text>{item.content}</Text>}
          </View>
        )}
      />
    </View>
  )
}
