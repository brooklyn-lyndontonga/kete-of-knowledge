import React, { useState } from "react"
import { View, Text, TextInput, Button, Alert } from "react-native"
import { supabase } from "../../auth/lib/supabaseClient"

export default function EmailSignUp({ navigation }) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignUp = async () => {
    if (!email) return Alert.alert("Enter your email")
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: "keteofknowledge://auth" },
      })
      if (error) throw error
      Alert.alert("Check your inbox", "We’ve sent you a sign-up link.")
      // optional: jump to sign-in to clarify next step
      navigation.navigate("EmailSignIn")
    } catch (e) {
      Alert.alert("Sign-up failed", e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center", padding:20 }}>
      <Text style={{ fontSize:20, fontWeight:"700", marginBottom:12 }}>Create your account</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ width:"100%", borderWidth:1, borderColor:"#ccc", padding:12, borderRadius:8, marginBottom:12 }}
      />
      <Button title={loading ? "Sending…" : "Continue"} onPress={handleSignUp} disabled={loading} />
    </View>
  )
}
