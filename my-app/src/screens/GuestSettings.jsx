/* eslint-disable no-undef */
/* eslint-disable unused-imports/no-unused-imports */
// src/screens/GuestSettings.jsx
import { useNavigation } from "@react-navigation/native"
import { View, Text, Button } from "react-native"

export default function GuestSettings() {
  // ✅ get navigation object from the hook
  const navigation = useNavigation()

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "600" }}>Guest Settings</Text>

      <Button
        title="Change Mode"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "ModeChooser" }], // ⚡ Make sure ModeChooser is registered in your RootNavigator
          })
        }
      />

      <Button
        title="Sign In"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "EmailSignIn" }], // ⚡ Make sure EmailSignIn is also registered
          })
        }
      />

      <Button
        title="About App"
        onPress={() => alert("App version 1.0.0 — Guest Mode")}
      />
    </View>
  )
}
