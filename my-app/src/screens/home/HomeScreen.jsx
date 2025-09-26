/* eslint-disable unused-imports/no-unused-imports */
import React from "react"
import { View, Text, Button, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "../../context/AuthContext"

function HomeScreen() {
  const navigation = useNavigation()
  const { user } = useAuth()

  // If already signed in, show a friendly welcome
  if (user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Kia ora 👋</Text>
        <Text style={styles.subtitle}>Welcome back to the app!</Text>
      </View>
    )
  }

  // Guest / first-time view (ModeChooser)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Kete of Knowledge</Text>
      <Text style={styles.subtitle}>
        Sign in for the full experience, or explore in guest mode.
      </Text>

      <Button
        title="Sign In / Sign Up"
        onPress={() => navigation.navigate("EmailSignIn")}
      />

      <View style={{ height: 20 }} />

      <Button
        title="Continue as Guest"
        color="gray"
        onPress={() => navigation.navigate("GuestTabs")}
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: "center",
  },
})

export default HomeScreen