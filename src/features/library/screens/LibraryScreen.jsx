import React from "react"
import { View, Text } from "react-native"
export default function LibraryScreen() {
  return (
    <View style={{ flex:1, alignItems:"center", justifyContent:"center", padding:20 }}>
      <Text style={{ fontSize:20, fontWeight:"bold" }}>📚 Library</Text>
      <Text style={{ marginTop:10, textAlign:"center" }}>Library placeholder.</Text>
    </View>
  )
}
