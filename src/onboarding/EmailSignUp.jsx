/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable unused-imports/no-unused-vars */
import { useState } from "react"
import { View, TextInput, Button, Alert } from "react-native"
import * as Linking from "expo-linking"
import { supabase } from "../auth/supabaseClient"
import { useOnboarding } from "../app/providers/OnboardingProvider"

function EmailSignUp() {
  const [busy, setBusy] = useState(false)
  const { email, setEmail } = useOnboarding()

  const register = async () => {
    if (!email) return Alert.alert("Enter your email")
    setBusy(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      options: {
        emailRedirectTo: Linking.createURL("auth"),
      },
    })

    setBusy(false)

    if (error) {
      Alert.alert("Error", error.message)
    } else {
      Alert.alert(
        "Check your inbox",
        "We sent you a confirmation email. Click the link to finish signing up."
      )
    }
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
      <Button
        title={busy ? "Registering…" : "Sign Up"}
        onPress={register}
        disabled={busy}
      />
    </View>
  )
}

export default EmailSignUp
