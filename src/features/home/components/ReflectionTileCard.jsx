import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useReflectionTile } from "../../../hooks/useReflectionTile"

export default function ReflectionTileCard() {
  const tile = useReflectionTile()

  if (!tile) return null

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{tile.title}</Text>
      {tile.caption && <Text style={styles.caption}>{tile.caption}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  caption: {
    opacity: 0.6,
    marginTop: 8,
  },
})
