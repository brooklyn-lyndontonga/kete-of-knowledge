/* eslint-disable unused-imports/no-unused-imports */
import React from "react"
import { View, Text, Button } from "react-native"

function CompleteProfile({ navigation }) {
  return (
    <View style={{ flex:1, padding:20 }}>
      <Text style={{ fontSize:20, fontWeight:"700" }}>Complete profile (optional)</Text>
      <Text style={{ marginTop:10 }}>Add a name, age, or preferences. This is optional for now.</Text>
      <View style={{ height:12 }} />
      <Button title="Mark Done" onPress={() => navigation.navigate("Done")} />
    </View>
  )
}

export default CompleteProfile