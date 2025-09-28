/* eslint-disable unused-imports/no-unused-imports */
import { View, Text, Button } from "react-native"

function OnboardingWelcome({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>Kia ora & Welcome!</Text>
      <Text style={{ marginVertical: 10, textAlign: "center" }}>
        Thanks for joining. Let’s set up your profile so you can get the best out of this app.
      </Text>
      <Button title="Set up Profile" onPress={() => navigation.navigate("CompleteProfile")} />
    </View>
  )
}

export default OnboardingWelcome