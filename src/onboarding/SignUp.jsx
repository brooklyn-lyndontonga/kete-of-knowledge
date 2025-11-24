import React from "react"
import { View, Text, StyleSheet } from "react-native"

export default function SignUp() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Sign Up</Text>
      <Text style={styles.subtitle}>
        With magic links, users sign up by entering their email on the Sign In screen.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 10 },
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    opacity: 0.7,
    maxWidth: 300,
    lineHeight: 20,
  },
})
