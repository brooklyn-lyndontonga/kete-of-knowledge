import React, { useState } from "react"
import { View, Text, TextInput, Button, Alert } from "react-native"
import * as Linking from "expo-linking"
import { supabase } from "../../auth/lib/supabaseClient"

export default function EmailSignIn() {
  const [email, setEmail] = useState("")
  const [sending, setSending] = useState(false)

  const sendLink = async () => {
    if (!email) return Alert.alert("Enter your email")
    try {
      setSending(true)
      const redirect = "keteofknowledge://auth" // matches scheme in app.config.js
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirect },
      })
      if (error) throw error
      Alert.alert("Check your email", "We sent you a sign-in link.")
    } catch (e) {
      Alert.alert("Error", e.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center", padding:20 }}>
      <Text style={{ fontSize:20, fontWeight:"700", marginBottom:12 }}>
        Continue with email
      </Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ width:"100%", borderWidth:1, borderColor:"#ccc", padding:12, borderRadius:8, marginBottom:12 }}
      />
      <Button title={sending ? "Sending…" : "Send magic link"} onPress={sendLink} disabled={sending} />
    </View>
  )
}
