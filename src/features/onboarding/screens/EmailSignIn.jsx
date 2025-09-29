// src/features/onboarding/screens/EmailSignIn.jsx
import React, { useState } from "react"
import { View, Text, TextInput, Button, Alert } from "react-native"
import * as Linking from "expo-linking"
import { supabase } from "../../auth/lib/supabaseClient"

export default function EmailSignIn() {
  const [email, setEmail] = useState("")
  const [sending, setSending] = useState(false)

  const sendLink = async () => {
    try {
      setSending(true)
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: "keteofknowledge://auth" },
      })
      if (error) throw error
      Alert.alert("Check your email", "We sent you a secure link to continue.")
    } catch (e) {
      Alert.alert("Something went wrong", e.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <View style={{ flex:1, padding:20, justifyContent:"center" }}>
      <Text style={{ fontSize:22, fontWeight:"700", marginBottom:8 }}>
        Continue with email
      </Text>
      <Text style={{ opacity:0.8, marginBottom:16 }}>
        We’ll email you a secure link to continue.
      </Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        style={{ borderWidth:1, borderColor:"#ccc", borderRadius:8, padding:12, marginBottom:12 }}
      />
      <Button title={sending ? "Sending…" : "Send link"} onPress={sendLink} disabled={!email || sending} />
      <Text style={{ marginTop:12, fontSize:12, opacity:0.7 }}>
        By continuing you agree to our Terms & Privacy.
      </Text>
    </View>
  )
}
