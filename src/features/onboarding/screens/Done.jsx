import React from "react"
import { View, Text, Button } from "react-native"
import { useNavigation } from "@react-navigation/native"

export default function Done() {
  const navigation = useNavigation()
  const goTabs = () => navigation.reset({ index: 0, routes: [{ name: "AppTabs" }] })

  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center", padding:20 }}>
      <Text style={{ fontSize:22, fontWeight:"700", marginBottom:12 }}>All set! 🎉</Text>
      <Text style={{ textAlign:"center", marginBottom:20 }}>
        You can change these settings anytime from your profile.
      </Text>
      <Button title="Go to dashboard" onPress={goTabs} />
    </View>
  )
}
