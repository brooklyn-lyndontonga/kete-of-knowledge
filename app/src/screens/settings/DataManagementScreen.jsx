import React from "react"
import { View, Text, Pressable, Alert } from "react-native"

export default function DataManagementScreen() {
  function handleExport() {
    // MVP: stub
    console.log("Export data")
  }

  function handleDelete() {
    Alert.alert(
      "Delete my data",
      "This will permanently delete all data on this device.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => console.log("Delete data"),
        },
      ]
    )
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12 }}>
        My data
      </Text>

      <Text style={{ marginBottom: 16, color: "#555" }}>
        This kete belongs to you. You can export or delete your data at any time.
      </Text>

      <Pressable onPress={handleExport} style={{ paddingVertical: 12 }}>
        <Text>⬇️ Export my data</Text>
      </Pressable>

      <Pressable onPress={handleDelete} style={{ paddingVertical: 12 }}>
        <Text style={{ color: "red" }}>🗑 Delete my data</Text>
      </Pressable>
    </View>
  )
}
