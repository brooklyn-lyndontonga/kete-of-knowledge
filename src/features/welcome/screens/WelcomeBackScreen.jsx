/* eslint-disable unused-imports/no-unused-imports */
// src/screens/WelcomeBackScreen.jsx
import { View, Text, Button } from "react-native"
import { useNavigation } from "@react-navigation/native"

function WelcomeBackScreen() {
  const nav = useNavigation()

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>👋 Welcome Back!</Text>
      <Text style={{ marginTop: 10, textAlign: "center" }}>
        This is the returning-user landing screen.  
        Later, you could add things like recent activity, quick links, or reminders here.
      </Text>
      <Button title="Go to Dashboard" onPress={() => nav.replace("AppTabs")} />
    </View>
  )
}

export default WelcomeBackScreen