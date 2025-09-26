/* eslint-disable unused-imports/no-unused-imports */
// src/screens/GuestSettings.jsx
import React from "react"
import { View, Text, Button, StyleSheet } from "react-native"

function GuestSettings({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guest Settings</Text>
      <Text style={styles.subtitle}>
        You are currently in Guest Mode. Limited features are available.
      </Text>

      <Button
        title="🔑 Switch Account Mode"
        onPress={() => {
          // Reset navigation stack → goes back to ModeChooser
          navigation.reset({
            index: 0,
            routes: [{ name: "ModeChooser" }],
          })
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
    color: "#666",
  },
})

export default GuestSettings
