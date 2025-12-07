import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useSnapshots } from "../../../hooks/useSnapshots"

export default function ProgressSnapshotCard() {
  const snapshots = useSnapshots()

  if (!snapshots.length) return null

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Your Progress</Text>
      {snapshots.map((snap) => (
        <View key={snap.id} style={styles.row}>
          <Text style={styles.label}>{snap.label}</Text>
          <Text style={styles.value}>{snap.percentage}%</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  label: { opacity: 0.7 },
  value: { fontWeight: "700" },
})
