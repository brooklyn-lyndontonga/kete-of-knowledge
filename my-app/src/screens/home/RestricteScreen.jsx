/* eslint-disable unused-imports/no-unused-imports */
// src/screens/RestrictedScreen.jsx
import { View, Text, Button } from "react-native"
import { useNavigation } from "@react-navigation/native"

export default function RestrictedScreen() {
  const navigation = useNavigation()

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "600", textAlign: "center", marginBottom: 12 }}>
        🔒 Restricted Feature
      </Text>
      <Text style={{ textAlign: "center", marginBottom: 24 }}>
        This feature is available to signed-in users only.  
        Sign up or sign in to unlock full access.
      </Text>
      <Button
        title="Sign In / Sign Up"
        onPress={() => navigation.navigate("EmailSignIn")}
      />
    </View>
  )
}
