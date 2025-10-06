import React from "react"
import { View, Text, Button } from "react-native"

export default function CompleteProfile({ navigation }) {
  return (
    <View style={{ flex:1, padding:20, justifyContent:"center" }}>
      <Text style={{ fontSize:22, fontWeight:"700", marginBottom:12 }}>
        Your profile
      </Text>
      <Text style={{ marginBottom:20 }}>
        Placeholder: collect basic details here (name, whānau, preferences…).
      </Text>

      <Button title="Skip for now" onPress={() => navigation.navigate("Done")} />
      <View style={{ height:10 }} />
      <Button title="Save & continue" onPress={() => navigation.navigate("Done")} />
    </View>
  )
}
