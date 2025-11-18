import React from "react"
import { View, Text, StyleSheet } from "react-native"

export default function ReflectionTile() {
  return (
    <View style={styles.tile}>
      <Text style={styles.title}>Reflection</Text>
      <Text style={styles.story}>
        “Last week our whānau walked each morning — even Nan joined in!”
      </Text>
      <Text style={styles.caption}>Keep going — your māia inspires others 💚</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: "#f5793b",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: { color: "white", fontWeight: "700", fontSize: 16 },
  story: { color: "white", marginTop: 8 },
  caption: { marginTop: 6, color: "white", opacity: 0.9, fontStyle: "italic" },
})
