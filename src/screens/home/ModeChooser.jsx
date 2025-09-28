/* eslint-disable unused-imports/no-unused-imports */
// src/screens/ModeChooser.jsx
import { View, Text, Button, TouchableOpacity } from "react-native"

function ModeChooser({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 30 }}>
        Welcome to Kete of Knowledge
      </Text>

      {/* 🔑 Primary Action */}
      <Button
        title="Sign In"
        onPress={() => navigation.navigate("EmailSignIn")}
      />

      {/* 🔑 Secondary Options */}
      <TouchableOpacity onPress={() => navigation.navigate("GuestTabs")}>
        <Text style={{ marginTop: 20, color: "gray" }}>Continue as Guest</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={{ marginTop: 10, color: "gray" }}>New here? Create an account</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ModeChooser