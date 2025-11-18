import React from "react"
import { View, Text, StyleSheet } from "react-native"

export default function ProgressSnapshot() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Progress</Text>

      <View style={styles.barContainer}>
        <View style={[styles.barFill, { width: "60%" }]} />
      </View>

      <Text style={styles.caption}>Checked in 3 days this week 🔥</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fcca59",
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
  },
  title: { fontWeight: "700", fontSize: 16 },
  barContainer: {
    height: 10,
    backgroundColor: "white",
    borderRadius: 8,
    marginTop: 10,
    overflow: "hidden",
  },
  barFill: { height: "100%", backgroundColor: "#267f53" },
  caption: { marginTop: 8, fontSize: 13 },
})
