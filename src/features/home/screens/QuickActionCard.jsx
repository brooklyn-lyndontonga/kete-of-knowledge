/* eslint-disable react/prop-types */
import React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"

export default function QuickActionCard({ title, emoji, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#99b7f5",
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
  },
  emoji: { fontSize: 26 },
  title: { marginTop: 6, fontWeight: "600", color: "white" },
})
