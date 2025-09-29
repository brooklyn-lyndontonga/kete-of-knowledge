import React from "react"
import { View, Text, Button } from "react-native"

export default function HomeWelcomeScreen({ navigation }) {
  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center", padding:20 }}>
      <Text style={{ fontSize:22, fontWeight:"700", marginBottom:8 }}>Nau mai, haere mai! 👋</Text>
      <Text style={{ textAlign:"center", marginBottom:20 }}>
        Here’s a quick tour of your dashboard. You can revisit this later from Settings.
      </Text>
      <Button title="Go to dashboard" onPress={() => navigation.replace("Home")} />
    </View>
  )
}
