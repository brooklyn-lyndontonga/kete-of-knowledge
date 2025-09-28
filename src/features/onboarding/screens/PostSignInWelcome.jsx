import React from "react"
import { View, Text, Button } from "react-native"

export default function PostSignInWelcome({ navigation }) {
  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center", padding:20 }}>
      <Text style={{ fontSize:20, fontWeight:"700", marginBottom:20 }}>
        Kia ora! Welcome 🎉
      </Text>
      <Text style={{ textAlign:"center", marginBottom:20 }}>
        Thanks for signing in. Let’s set up your profile so the app can be personalised for you.
      </Text>
      <Button title="Continue" onPress={() => navigation.navigate("CompleteProfile")} />
    </View>
  )
}
