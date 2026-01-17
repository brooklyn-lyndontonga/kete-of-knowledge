import React, { useState } from "react"
import { View, Text, TextInput, FlatList, Pressable } from "react-native"
import { useAppData } from "../../../app/providers/AppDataProvider"


export default function ChecklistScreen() {
  console.log("📋 ChecklistScreen rendered")

  const {
    checklistItems,
    addChecklistItem,
    deleteChecklistItem,
  } = useAppData()

  const [text, setText] = useState("")

  function handleAdd() {
    if (!text.trim()) return

    addChecklistItem({
      id: Date.now(),
      text,
      completed: false,
    })

    setText("")
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
        Checklist
      </Text>

      <TextInput
        placeholder="Add checklist item…"
        value={text}
        onChangeText={setText}
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 10,
          borderRadius: 8,
          marginBottom: 12,
        }}
      />

      <Pressable onPress={handleAdd}>
        <Text style={{ color: "blue", marginBottom: 16 }}>＋ Add item</Text>
      </Pressable>

      <FlatList
        data={checklistItems}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={{ color: "#666" }}>
            No checklist items yet 🌱
          </Text>
        }
        renderItem={({ item }) => (
          <View
            style={{
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: "#eee",
            }}
          >
            <Text>{item.text}</Text>

            <Pressable onPress={() => deleteChecklistItem(item.id)}>
              <Text style={{ color: "red", marginTop: 4 }}>Delete</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  )
}
