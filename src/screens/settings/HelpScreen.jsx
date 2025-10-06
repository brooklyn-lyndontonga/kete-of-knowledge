import React from "react"
import { View, Text } from "react-native"

export default function HelpScreen(){
  return (
    <View style={{ flex:1, alignItems:"center", justifyContent:"center", padding:20 }}>
      <Text style={{ fontSize:22, fontWeight:"700" }}>❓ Help & Support</Text>
      <Text style={{ marginTop:10, textAlign:"center" }}>
        Placeholder help content. FAQs, contact info, etc.
      </Text>
    </View>
  )
}
