import React, { useState } from "react"
import { View, Text, TextInput, Button, Alert } from "react-native"
import { supabase } from "../../auth/lib/supabaseClient"
import { useAuth } from "../../../app/providers/AuthProvider"

export default function CompleteProfile({ navigation, route }) {
  const { user } = useAuth()
  const dev = route?.params?.dev === true
  const [displayName, setDisplayName] = useState("")

  const save = async (finish=false) => {
    try {
      if (dev || !user) {
        if (finish) navigation.navigate("Done", { dev: true })
        else Alert.alert("Dev mode", "Skipped saving (no auth).")
        return
      }

      await supabase.from("profiles").upsert({
        user_id: user.id,
        display_name: displayName || null,
      })

      if (finish) navigation.navigate("Done")
      else Alert.alert("Saved", "You can finish later from Profile.")
    } catch (e) {
      Alert.alert("Error", e.message)
    }
  }

  return (
    <View style={{ flex:1, justifyContent:"center", padding:20 }}>
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 12 }}>
        Your profile {dev ? "(dev / no-auth)" : ""}
      </Text>
      <TextInput
        placeholder="Display name"
        value={displayName}
        onChangeText={setDisplayName}
        autoCapitalize="words"
        style={{ borderWidth:1, borderColor:"#ccc", borderRadius:8, padding:12, marginBottom:12 }}
      />
      <Button title="Save & continue" onPress={() => save(true)} />
      <View style={{ height: 12 }} />
      <Button title="Save for later" onPress={() => navigation.navigate("Done", { dev: dev || !user })} />
    </View>
  )
}
