/* eslint-disable unused-imports/no-unused-imports */
// src/screens/home/HomeScreen.jsx
import React from "react"
import { View, Text, Button, ScrollView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "../../context/AuthContext"

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

      {/* --- Dev Section --- */}
      <View
        style={{
          marginTop: 40,
          width: "100%",
          padding: 20,
          backgroundColor: "#f2f2f2",
          borderRadius: 8,
        }}
      >
        <Text
          style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}
        >
          🛠 Dev Tools
        </Text>

        {/* First-time signup flow */}
        <Button
          title="DEV: Open Post-Signup Flow"
          onPress={() => nav.navigate("PostSignInDev")}
        />

        {/* Returning user flow → AppTabs/Home dashboard */}
        <View style={{ marginTop: 12 }}>
          <Button
            title="DEV: Open Returning User Flow"
            onPress={() => nav.navigate("AppTabs", { screen: "Home" })}
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default HomeScreen