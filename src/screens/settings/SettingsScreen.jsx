/* eslint-disable unused-imports/no-unused-imports */
import { View, Text } from "react-native"

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>⚙️ Settings</Text>
      <Text style={{ marginTop: 10, textAlign: "center" }}>
        This is the Settings screen.  
        Later, it will include account settings, preferences, and app configurations.  
        Currently just a placeholder.
      </Text>
    </View>
  )
}

export default SettingsScreen