/* eslint-disable unused-imports/no-unused-imports */
import { View, Text, Switch, Button } from "react-native"
import { useState } from "react"

function ConsentScreen({ navigation }) {
  const [consent, setConsent] = useState(false)

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Privacy & Consent</Text>
      <Text style={{ marginVertical: 10, textAlign: "center" }}>
        You must agree to our data policy before using the app.
      </Text>
      <Switch value={consent} onValueChange={setConsent} />
      <Button
        title="Continue"
        onPress={() => navigation.navigate("OnboardingWelcome")}
        disabled={!consent}
      />
    </View>
  )
}

export default ConsentScreen