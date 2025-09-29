import React from "react"
import { View, Text, Button } from "react-native"
import { supabase } from "../../auth/lib/supabaseClient"
import { useAuth } from "../../../app/providers/AuthProvider"

export default function Done({ navigation }) {
  const { user } = useAuth()

  const finish = async () => {
    if (user) {
      await supabase.from("profiles").update({ completed: true }).eq("user_id", user.id)
    }
    navigation.reset({ index: 0, routes: [{ name: "AppTabs" }] })
  }

  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center", padding:20 }}>
      <Text style={{ fontSize:22, fontWeight:"700", marginBottom:8 }}>Nau mai, haere mai! 👋</Text>
      <Text style={{ textAlign:"center", marginBottom:20 }}>
        You’re all set. A quick tour appears on the dashboard.
      </Text>
      <Button title="Start using the app" onPress={finish} />
    </View>
  )
}
