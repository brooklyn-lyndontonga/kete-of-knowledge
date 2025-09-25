/* eslint-disable unused-imports/no-unused-imports */
import { useState } from "react"
import { View, TextInput, Button, Alert } from "react-native"
import * as Linking from "expo-linking"
import { supabase } from "../auth/supabaseClient"
import { useOnboarding } from "./OnboardingContext"

export default function EmailSignIn() {
  const [busy, setBusy] = useState(false)
  const { email, setEmail } = useOnboarding()
  const send = async () => {
    if (!email) return Alert.alert("Enter your email")
    setBusy(true)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: Linking.createURL("auth") }
    })
    setBusy(false)
    if (error) Alert.alert("Error", error.message)
    else Alert.alert("Sent", "Check your email for the sign-in link")
  }
  return (
    <View style={{ padding:20, gap:12 }}>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize="none"
                 placeholder="email@example.com" keyboardType="email-address"
                 style={{ borderWidth:1, padding:12, borderRadius:10 }}/>
      <Button title={busy ? "Sending…" : "Send link"} onPress={send} disabled={busy}/>
    </View>
  )
}
