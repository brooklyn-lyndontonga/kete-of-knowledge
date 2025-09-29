import React, { useState } from "react"
import { View, Text, TextInput, Button, Alert } from "react-native"
import { supabase } from "../../auth/lib/supabaseClient"
import { useAuth } from "../../../app/providers/AuthProvider"

export default function CompleteProfile({ navigation }) {
  const { user } = useAuth()
  const [displayName, setDisplayName] = useState("")

  const saveNow = async (done=false) => {
    try {
      if (!user) return Alert.alert("Not signed in")
      await supabase.from("profiles").upsert({
        user_id: user.id,
        display_name: displayName || null,
      })
      if (done) navigation.navigate("Done")
      else Alert.alert("Saved", "You can finish later from your profile.")
    } catch (e) {
      Alert.alert("Error", e.message)
    }
  }

  return (
    <View style={{ flex:1, justifyContent:"center", padding:20 }}>
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 12 }}>Your profile</Text>
      <TextInput
        placeholder="Display name"
        value={displayName}
        onChangeText={setDisplayName}
        style={{ borderWidth:1, borderColor:"#ccc", borderRadius:8, padding:12, marginBottom:12 }}
      />
      <Button title="Save & continue" onPress={() => saveNow(true)} />
      <View style={{ height: 12 }} />
      <Button title="Save for later" onPress={() => navigation.navigate("Done")} />
    </View>
  )
}
