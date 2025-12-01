/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { apiGet } from "../utils/api"

export default function ProgressSnapshot() {
  const [snap, setSnap] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    apiGet("/snapshots/latest")
      .then((data) => setSnap(data))
      .catch(() => setError("Unable to load progress"))
  }, [])

  if (error) return <Text>{error}</Text>
  if (!snap) return <Text>Loading progress…</Text>

  return (
    <View style={styles.card}>
      <Text style={styles.label}>{snap.label}</Text>

      <View style={styles.barBackground}>
        <View
          style={[
            styles.barFill,
            { width: `${snap.percentage}%` }
          ]}
        />
      </View>

      <Text style={styles.percent}>{snap.percentage}%</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  barBackground: {
    height: 12,
    width: "100%",
    backgroundColor: "#eee",
    borderRadius: 10,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
  percent: {
    marginTop: 8,
    fontSize: 14,
    color: "#555",
  },
})
