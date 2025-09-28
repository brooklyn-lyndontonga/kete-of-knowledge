/* eslint-disable unused-imports/no-unused-imports */
/* src/screens/RestrictedScreen.jsx */
import React from "react"
import { View, Text, Button } from "react-native"
import { useNavigation } from "@react-navigation/native"

function RestrictedScreen() {
  const nav = useNavigation()
  return (
    <View style={{ flex:1, padding:20, justifyContent:"center", alignItems:"center" }}>
      <Text style={{ fontSize:18, fontWeight:"600", marginBottom:12 }}>🔒 Locked feature</Text>
      <Text style={{ textAlign:"center", marginBottom:20 }}>
        This area requires you to sign in. Sign up or sign in to unlock full access.
      </Text>
      <Button title="Sign In / Sign Up" onPress={() => nav.navigate("EmailSignIn")} />
    </View>
  )
}

export default RestrictedScreen