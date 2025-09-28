/* eslint-disable no-undef */
/* eslint-disable unused-imports/no-unused-imports */
/* src/screens/HomeScreen.jsx */
import React from "react"
import { View, Text, Button } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "../../context/AuthContext"

function HomeScreen() {
  const nav = useNavigation()
  const { user } = useAuth()

  if (user) {
    return (
      <View style={{ flex:1, padding:20 }}>
        <Text style={{ fontSize:24, fontWeight:"700" }}>Your Dashboard</Text>
        <Text style={{ marginTop:8 }}>
          Welcome back — this is your dashboard. (Placeholder content.)
        </Text>
      </View>
    )
  }

  // guest landing / mode chooser
  return (
    <View style={{ flex:1, padding:20 }}>
      <Text style={{ fontSize:26, fontWeight:"700", marginBottom:12 }}>Welcome to Kete of Knowledge</Text>
      <Text style={{ marginBottom:20 }}>
        Sign up for full access or continue as guest (limited features).
      </Text>

      <Button title="Sign In / Sign Up" onPress={() => nav.navigate("EmailSignIn")} />
      <View style={{ height:10 }} />

      <Button title="Continue as Guest" color="gray" onPress={() => { /* guest = default - nothing needed */ }} />
      <View style={{ height:20 }} />

      {/* DEV BYPASS: opens PostSignIn stack so devs can build post-signup screens */}
      {__DEV__ && (
        <>
          <Button title="DEV: Open post-signup flow" color="#b35700"
                  onPress={() => nav.navigate("PostSignInDev", { screen: "PostSignInWelcome" })} />
          <Text style={{ marginTop:8, fontSize:12, color:"#666" }}>
            Dev-only link — remove before release
          </Text>
        </>
      )}
    </View>
  )
}

export default HomeScreen