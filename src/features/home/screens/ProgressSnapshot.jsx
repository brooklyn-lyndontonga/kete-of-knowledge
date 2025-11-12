import React from "react"
import { View, Text, StyleSheet } from "react-native"

export default function ProgressSnapshot() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress Snapshot</Text>
      <View style={styles.barContainer}>
        <View style={styles.barFill} />
      </View>
      <Text style={styles.caption}>You’ve checked in 3 days this week 🟢</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fcca59",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  title: { fontWeight: "700", fontSize: 16 },
  barContainer: {
    height: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
    overflow: "hidden",
  },
  barFill: {
    width: "60%",
    height: "100%",
    backgroundColor: "#267f53",
  },
  caption: { marginTop: 8, fontSize: 13 },
})
