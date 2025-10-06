import React from "react"
import { View, Text, Button } from "react-native"
import { useNavigation } from "@react-navigation/native"

export default function SettingsScreen(){
  const nav = useNavigation()
  return (
    <View style={{ flex:1, alignItems:"center", justifyContent:"center", padding:20 }}>
      <Text style={{ fontSize:22, fontWeight:"700", marginBottom:12 }}>⚙️ Settings</Text>
      <Button title="Help & Support" onPress={() => nav.navigate("Help")} />
    </View>
  )
}
