/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react"
import { View, Text, Button, ScrollView } from "react-native"
import { API_URL } from "../../../lib/api"

export default function UserReflectionListScreen({ navigation }) {
  const [items, setItems] = useState([])

  async function load() {
    const res = await fetch(`${API_URL}/reflections`)
    const json = await res.json()
    setItems(json)
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", load)
    return unsubscribe
  }, [navigation])

  return (
    <ScrollView style={{ padding: 20 }}>
      <Button title="Write Reflection" onPress={() => navigation.navigate("WriteReflection")} />

      {items.map((r) => (
        <View key={r.id} style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: "bold" }}>{r.title}</Text>
          <Text>{r.story}</Text>
          <Text style={{ opacity: 0.6 }}>{r.created_at}</Text>
        </View>
      ))}
    </ScrollView>
  )
}
