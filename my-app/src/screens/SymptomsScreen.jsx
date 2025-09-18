import { useState } from "react"
import { spacing } from "../theme"

const MOCK = [
  { id: "s1", name: "Chest pain" },
  { id: "s2", name: "Shortness of breath" },
  { id: "s3", name: "Dizziness" }
]

export default function SymptomsScreen() {
  const [q, setQ] = useState("")
  const data = MOCK.filter(item => item.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text variant="heading">Symptoms</Text>
      <Spacer />
      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder="Search symptoms…"
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
          <Card style={{ marginBottom: spacing.md }}>
            <Text>{item.name}</Text>
          </Card>
        )}
      />
    </View>
  )
}
