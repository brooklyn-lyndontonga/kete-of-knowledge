/* eslint-disable react/react-in-jsx-scope */
import { View, Text, FlatList, Pressable } from "react-native"
import { useEffect, useState } from "react"
import { API_URL } from "../../../../lib/api"


export default function ChecklistList() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetchItems()
  }, [])

  async function fetchItems() {
    const res = await fetch(`${API_URL}/checklist`)
    const data = await res.json()
    setItems(data)
  }

  async function toggleComplete(item) {
    await fetch(`${API_URL}/checklist/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !item.completed }),
    })

    fetchItems()
  }

  return (
    <View>
      <Text style={{ fontWeight: "600", marginBottom: 8 }}>
        Tasks
      </Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => toggleComplete(item)}
            style={{ marginBottom: 12 }}
          >
            <Text
              style={{
                textDecorationLine: item.completed
                  ? "line-through"
                  : "none",
              }}
            >
              {item.title}
            </Text>
          </Pressable>
        )}
      />
    </View>
  )
}
