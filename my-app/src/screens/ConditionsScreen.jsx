import React, { useState } from "react"
import { View, FlatList, TextInput, TouchableOpacity } from "react-native"
import Text from "../components/ui/Text"
import Card from "../components/ui/Card"
import Spacer from "../components/ui/Spacer"
import { spacing } from "../theme"

const MOCK = [
  { id: "c1", name: "Hypertension" },
  { id: "c2", name: "Diabetes (Type 2)" },
  { id: "c3", name: "High Cholesterol" }
]

export default function ConditionsScreen() {
  const [q, setQ] = useState("")
  const data = MOCK.filter(item => item.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text variant="heading">Conditions</Text>
      <Spacer />
      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder="Search conditions…"
        style={{
          padding: spacing.md,
          borderWidth: 1,
          borderRadius: 12
        }}
      />
      <Spacer />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Card style={{ marginBottom: spacing.md }}>
              <Text>{item.name}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
