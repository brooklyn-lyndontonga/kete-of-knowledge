import { useState } from "react"
import { spacing } from "../../theme"

function MedicinesScreen() {
  const [q, setQ] = useState("")
  const data = MOCK.filter(item => item.name.toLowerCase().includes(q.toLowerCase()))
  const MOCK = [
  { id: "m1", name: "Aspirin" },
  { id: "m2", name: "Atorvastatin" },
  { id: "m3", name: "Metformin" }
]

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text variant="heading">Medicines</Text>
      <Spacer />
      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder="Search medicines…"
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

export default MedicinesScreen