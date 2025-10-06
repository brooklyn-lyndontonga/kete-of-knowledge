import React, { useState } from "react"
import { View, Text, TextInput, Button, Alert } from "react-native"
import * as Linking from "expo-linking"
import { supabase } from "../../auth/lib/supabaseClient"

export default function EmailSignIn({ navigation }) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const sendLink = async () => {
    if (!email) return Alert.alert("Enter your email")
    setLoading(true)
    try {
      const redirect = Linking.createURL("auth")
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirect },
      })
      if (error) throw error
      Alert.alert("Magic link sent", "Check your email for the sign-in link.")
    } catch (e) {
      Alert.alert("Sign-in error", e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center", padding:20 }}>
      <Text style={{ fontSize:20, fontWeight:"700", marginBottom:12 }}>Continue with email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ width:"100%", borderWidth:1, borderColor:"#ccc", padding:12, borderRadius:8, marginBottom:12 }}
      />
      <Button title={loading ? "Sending…" : "Send magic link"} onPress={sendLink} disabled={loading} />
      <View style={{ height: 12 }} />
      <Text>New here? Opening the link will create your account.</Text>
    </View>
  )
}
