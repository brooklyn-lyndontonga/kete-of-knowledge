import React from "react"
import { View, Text, Button } from "react-native"
import { useNavigation } from "@react-navigation/native"
export default function WelcomeBackScreen() {
  const navigation = useNavigation()
  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center", padding:20 }}>
      <Text style={{ fontSize:22, fontWeight:"700", marginBottom:12 }}>Welcome back!</Text>
      <Text style={{ textAlign:"center", marginBottom:20 }}>
        You’re signed in. Tap below to go to your dashboard.
      </Text>
      <Button
        title="Go to dashboard"
        onPress={() => navigation.reset({ index: 0, routes: [{ name: "AppTabs" }] })}
      />
    </View>
  )
}
