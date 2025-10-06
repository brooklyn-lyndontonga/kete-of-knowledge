import React from "react"
import { View, Text } from "react-native"

export default function HomeWelcomeScreen(){
  return (
    <View style={{flex:1,alignItems:"center",justifyContent:"center",padding:20}}>
      <Text style={{ fontSize:22, fontWeight:"700" }}>Welcome</Text>
      <Text style={{ marginTop:10, textAlign:"center" }}>
        Placeholder welcome screen.
      </Text>
    </View>
  )
}
