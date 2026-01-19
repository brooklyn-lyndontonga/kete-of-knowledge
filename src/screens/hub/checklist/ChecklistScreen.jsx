/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { StyleSheet } from "react-native"
import { FlatList, Text, View } from "react-native"
import { useEffect, useState } from "react"
import { API_URL } from "../../../lib/api"
import ChecklistForm from "./components/ChecklistForm"
import ChecklistItem from "./components/ChecklistItem"

export default function ChecklistScreen() {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    fetchItems()
  }, [])

  async function fetchItems() {
    const res = await fetch(`${API_URL}/checklist`)
    setItems(await res.json())
  }

  async function deleteItem(id) {
    await fetch(`${API_URL}/checklist/${id}`, { method: "DELETE" })
    fetchItems()
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(i) => i.id.toString()}
      contentContainerStyle={{ padding: 16 }}
      ListHeaderComponent={
        <View>
          <Text style={{ fontSize: 20 }}>Checklist</Text>
          <ChecklistForm
            editing={editing}
            onSaved={() => {
              setEditing(null)
              fetchItems()
            }}
            onCancel={() => setEditing(null)}
          />
        </View>
      }
      renderItem={({ item }) => (
        <ChecklistItem
          item={item}
          onEdit={() => setEditing(item)}
          onDelete={() => deleteItem(item.id)}
          onToggle={async () => {
            await fetch(`${API_URL}/checklist/${item.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ completed: !item.completed }),
            })
            fetchItems()
          }}
        />
      )}
    />
  )
}
