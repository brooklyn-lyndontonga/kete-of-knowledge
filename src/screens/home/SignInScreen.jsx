/* eslint-disable unused-imports/no-unused-imports */
import { useState } from "react"
import { View, Text, TextInput, Button, StyleSheet } from "react-native"
import * as Linking from "expo-linking"
import { supabase } from "../../auth/supabaseClient"

function SignInScreen() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  async function handleSignIn() {
    // Create redirect URL matching your app.json scheme
    const redirectTo = Linking.createURL("auth")

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    })

    if (error) {
      setMessage(`❌ Error: ${error.message}`)
    } else {
      setMessage("✅ Check your email for the sign-in link")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Send Magic Link" onPress={handleSignIn} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 16, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
  message: { marginTop: 12, textAlign: "center" },
})

export default SignInScreen
