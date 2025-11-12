import React from "react"
import { View, Text, StyleSheet } from "react-native"

export default function ReflectionTile() {
  return (
    <View style={styles.tile}>
      <Text style={styles.title}>Reflection</Text>
      <Text style={styles.story}>
        “Last week our whānau walked together every morning before kura — even our nan joined in!”
      </Text>
      <Text style={styles.caption}>Keep going — your small steps inspire others 💚</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: "#f5793b",
    borderRadius: 12,
    padding: 16,
  },
  title: { fontSize: 16, fontWeight: "700", color: "#fff" },
  story: { color: "#fff", marginTop: 6 },
  caption: { color: "#fff", fontStyle: "italic", marginTop: 6, fontSize: 13 },
})
