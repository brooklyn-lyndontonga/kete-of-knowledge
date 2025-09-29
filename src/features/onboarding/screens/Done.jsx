/* src/features/onboarding/screens/Done.jsx */
import React from "react"
import { View, Text, Button } from "react-native"
import { supabase } from "../../auth/lib/supabaseClient"
import { useAuth } from "../../../app/providers/AuthProvider"

export default function Done({ navigation, route }) {
  const { user } = useAuth()
  const dev = route?.params?.dev === true

  const finish = async () => {
    // In dev/guest, don’t attempt DB writes
    if (!dev && user) {
      await supabase
        .from("profiles")
        .update({ completed: true })
        .eq("user_id", user.id)
    }

    // Reset to: AppTabs -> Home tab -> HomeWelcome (inside HomeStack)
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "AppTabs",
          params: { screen: "Home", params: { screen: "HomeWelcome" } },
        },
      ],
    })
  }

  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center", padding:20 }}>
      <Text style={{ fontSize:22, fontWeight:"700", marginBottom:8 }}>
        {dev ? "Dev complete (no-auth)" : "All set! ✅"}
      </Text>
      <Text style={{ textAlign:"center", marginBottom:20 }}>
        {dev
          ? "Skipping server writes. You’ll now jump into the dashboard welcome."
          : "Next you’ll see a quick tour on your dashboard."}
      </Text>
      <Button title="Continue" onPress={finish} />
    </View>
  )
}
