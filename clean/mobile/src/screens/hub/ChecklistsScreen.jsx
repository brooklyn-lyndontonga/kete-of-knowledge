/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { ScrollView, Text, View, Button } from "react-native"
import { useState } from "react"

export default function ChecklistsScreen({ navigation }) {
  const [checklists, setChecklists] = useState([])

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Button
        title="Create Checklist"
        onPress={() => navigation.navigate("AddChecklist")}
      />

      {checklists.length === 0 ? (
        <Text style={{ opacity: 0.6 }}>
          No checklists yet
        </Text>
      ) : (
        checklists.map((list, index) => (
          <View
            key={index}
            style={{
              padding: 12,
              backgroundColor: "#f3f3f3",
              borderRadius: 8,
            }}
          >
            <Text style={{ fontWeight: "600" }}>{list.title}</Text>
            <Text>{list.items.length} items</Text>
          </View>
        ))
      )}
    </ScrollView>
  )
}
