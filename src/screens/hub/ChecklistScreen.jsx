import React, { useEffect, useState } from "react"
import { View, Text, Pressable } from "react-native"
import checklist from "../../data/checklist.json"
import { saveItem, loadItem } from "../../lib/storage"

const STORAGE_KEY = "daily-checklist"

export default function ChecklistScreen() {
  console.log("📋 ChecklistScreen rendered")

  const [completed, setCompleted] = useState({})

  // Load saved state on mount
  useEffect(() => {
    loadItem(STORAGE_KEY, {}).then((saved) => {
      console.log("📦 Loaded checklist state", saved)
      setCompleted(saved)
    })
  }, [])

  // Persist on change
  useEffect(() => {
    saveItem(STORAGE_KEY, completed)
  }, [completed])

  function toggle(id) {
    setCompleted((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <View style={{ padding: 16 }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          marginBottom: 16,
        }}
      >
        Daily Check-in
      </Text>

      {checklist.map((item) => (
        <Pressable
          key={item.id}
          onPress={() => toggle(item.id)}
          style={{
            paddingVertical: 12,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, marginRight: 12 }}>
            {completed[item.id] ? "✅" : "⬜️"}
          </Text>

          <Text
            style={{
              fontSize: 16,
              textDecorationLine: completed[item.id]
                ? "line-through"
                : "none",
            }}
          >
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  )
}
