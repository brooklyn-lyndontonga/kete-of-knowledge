/* eslint-disable unused-imports/no-unused-imports */
import React from "react"
import { View, Text, Button } from "react-native"

function Done({ navigation }) {
  return (
    <View style={{ flex:1, padding:20 }}>
      <Text style={{ fontSize:20, fontWeight:"700" }}>All set</Text>
      <Text style={{ marginTop:10 }}>You're ready to explore the app.</Text>
      <View style={{ height:12 }} />
      <Button title="Open App" onPress={() => navigation.navigate("AppTabs")} />
    </View>
  )
}

export default Done