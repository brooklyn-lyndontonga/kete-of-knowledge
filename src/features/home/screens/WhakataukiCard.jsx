import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import whakataukiData from "../../../data/whakatauki.json" // ✅ your file

export default function WhakataukiCard() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    // Rotate every 8 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % whakataukiData.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const { text, translation } = whakataukiData[currentIndex]

  return (
    <View style={styles.card}>
      <Text style={styles.maori}>{text}</Text>
      <Text style={styles.translation}>{translation}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f296bd",
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
  },
  maori: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 6,
  },
  translation: {
    fontSize: 13,
    fontStyle: "italic",
    color: "#fff",
    opacity: 0.9,
  },
})
