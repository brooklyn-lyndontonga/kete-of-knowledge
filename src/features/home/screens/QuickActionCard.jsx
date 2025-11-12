/* eslint-disable react/prop-types */
import React from "react"
import { TouchableOpacity, Text, StyleSheet, View } from "react-native"

export default function QuickActionCard({ title, emoji, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.inner}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#99b7f5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flex: 1,
    marginHorizontal: 4,
  },
  inner: { alignItems: "center" },
  emoji: { fontSize: 28 },
  title: { marginTop: 8, fontSize: 14, fontWeight: "600", color: "#fff" },
})
