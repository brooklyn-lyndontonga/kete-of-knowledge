import React, { useState, useEffect } from "react"
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { supabase } from "../../supabaseClient"

export default function EmailSignIn() {
  const [email, setEmail] = useState("")
  const [consentAccepted, setConsentAccepted] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem("consentAccepted").then((val) => {
      setConsentAccepted(val === "true")
    })
  }, [])

  const handleSignIn = async () => {
    if (!consentAccepted) {
      Alert.alert("You must accept consent first")
      return
    }
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: "keteofknowledge://auth" },
    })
    if (error) Alert.alert(error.message)
    else Alert.alert("Check your email for a magic link!")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="name@example.com"
        autoCapitalize="none"
      />
      <Button title="Send Magic Link" onPress={handleSignIn} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  label: { marginBottom: 10, fontSize: 16 },
  input: { borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 },
})
