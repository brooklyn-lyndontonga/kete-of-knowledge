import React from "react"
import { View, Text, Button } from "react-native"

export default function EmailSignUp({ navigation }) {
  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center", padding:20 }}>
      <Text style={{ fontSize:20, fontWeight:"700", marginBottom:12 }}>Create your account</Text>
      <Text style={{ textAlign:"center", marginBottom:16 }}>
        We use magic links—continue to enter your email and we’ll send you a link.
      </Text>
      <Button title="Continue with email" onPress={() => navigation.replace("EmailSignIn")} />
    </View>
  )
}
