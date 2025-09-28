/* eslint-disable unused-imports/no-unused-imports */
import { View, Text } from "react-native"

function HelpScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>❓ Help & Support</Text>
      <Text style={{ marginTop: 10, textAlign: "center" }}>
        This is the Help screen.  
        Here users will eventually find FAQs, support links, and contact info.  
        Placeholder until those are built.
      </Text>
    </View>
  )
}

export default HelpScreen