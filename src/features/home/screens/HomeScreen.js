/* eslint-disable unused-imports/no-unused-imports */
// src/screens/home/HomeScreen.jsx
import React from "react"
import { View, Text, Button, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "../../../app/providers/AuthProvider"

function HomeScreen() {
  const nav = useNavigation()
  const { user } = useAuth()
  const isGuest = !user

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>🏠 Home Dashboard</Text>
      <Text style={{ marginTop: 10, textAlign: "center" }}>
        {isGuest
          ? "You are currently in Guest Mode. Sign up or sign in to unlock full features."
          : "Welcome back! You’re signed in and will see more features here soon."}
      </Text>

      <Button
        title="Sign In"
        onPress={() => nav.navigate("EmailSignIn")}
      />
      <Button
        title="Sign Up"
        onPress={() => nav.navigate("EmailSignUp")}
      />
    </ScrollView>
  )
}

export default HomeScreen