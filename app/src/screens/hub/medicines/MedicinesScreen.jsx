/* eslint-disable react/react-in-jsx-scope */
import { FlatList, Text, View } from "react-native"
import { useEffect, useState } from "react"
import { API_URL } from "../../../lib/api"
import MedicineForm from "./components/MedicineForm"
import MedicineItem from "./components/MedicineItem"

export default function MedicinesScreen() {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    fetchItems()
  }, [])

  async function fetchItems() {
    const res = await fetch(`${API_URL}/medicines`)
    setItems(await res.json())
  }

  async function deleteItem(id) {
    await fetch(`${API_URL}/medicines/${id}`, { method: "DELETE" })
    fetchItems()
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(i) => i.id.toString()}
      contentContainerStyle={{ padding: 16 }}
      ListHeaderComponent={
        <View>
          <Text style={{ fontSize: 20 }}>Medicines</Text>
          <MedicineForm
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
        <MedicineItem
          item={item}
          onEdit={() => setEditing(item)}
          onDelete={() => deleteItem(item.id)}
          onToggle={async () => {
            await fetch(`${API_URL}/medicines/${item.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ active: !item.active }),
            })
            fetchItems()
          }}
        />
      )}
    />
  )
}
