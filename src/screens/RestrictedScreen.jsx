import React from "react"
import { View, Text, Button } from "react-native"
import { useNavigation } from "@react-navigation/native"

export default function RestrictedScreen({ route }) {
  const navigation = useNavigation()
  const cta = route?.params?.cta ?? "This area requires sign-in."
  return (
    <View style={{ flex:1, alignItems:"center", justifyContent:"center", padding:20 }}>
      <Text style={{ fontSize:18, fontWeight:"600", marginBottom:12 }}>🔒 Locked feature</Text>
      <Text style={{ textAlign:"center", marginBottom:20 }}>{cta}</Text>
      <Button title="Sign in" onPress={() => navigation.navigate("EmailSignIn")} />
    </View>
  )
}
