/* eslint-disable unused-imports/no-unused-imports */
 
import { useState } from "react"
import { View, TextInput, Button, Alert, Text, TouchableOpacity } from "react-native"
import * as Linking from "expo-linking"
import { supabase } from "@features/auth/lib/supabaseClient"
import { useOnboarding } from "@app/providers/OnboardingProvider"


function EmailSignIn({ navigation }) {
  const [busy, setBusy] = useState(false)
  const { email, setEmail } = useOnboarding()

  const send = async () => {
    if (!email) return Alert.alert("Enter your email")
    setBusy(true)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: Linking.createURL("auth") },
    })
    setBusy(false)
    if (error) Alert.alert("Error", error.message)
    else Alert.alert("Sent", "Check your email for the sign-in link")
  }

  return (
    <View style={{ padding: 20, gap: 12 }}>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        placeholder="email@example.com"
        keyboardType="email-address"
        style={{ borderWidth: 1, padding: 12, borderRadius: 10 }}
      />
      <Button title={busy ? "Sending…" : "Sign In"} onPress={send} disabled={busy} />

      {/* 🔹 Link to Sign Up */}
      <TouchableOpacity onPress={() => navigation.navigate("EmailSignUp")}>
        <Text style={{ marginTop: 16, color: "blue", textAlign: "center" }}>
          Don’t have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default EmailSignIn
