/* eslint-disable react/react-in-jsx-scope */
import { View, Text, FlatList, Pressable } from "react-native"
import { useEffect, useState } from "react"
import { API_URL } from "../../../../lib/api"


export default function MedicineList() {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetchMedicines()
  }, [])

  async function fetchMedicines() {
    const res = await fetch(`${API_URL}/medicines`)
    const data = await res.json()
    setItems(data)
  }

  async function toggleActive(item) {
    await fetch(`${API_URL}/medicines/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !item.active }),
    })

    fetchMedicines()
  }

  return (
    <View>
      <Text style={{ fontWeight: "600", marginBottom: 8 }}>
        Current medicines
      </Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => toggleActive(item)}
            style={{ marginBottom: 12 }}
          >
            <Text>{item.name}</Text>
            <Text style={{ fontSize: 12, color: "#666" }}>
              {item.active ? "Active" : "Inactive"}
            </Text>
          </Pressable>
        )}
      />
    </View>
  )
}
