/* eslint-disable unused-imports/no-unused-imports */
import { View, Text, Button } from "react-native"

function Done({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>All Set! 🎉</Text>
      <Text style={{ marginTop: 10 }}>You’re ready to start using the app.</Text>
      <Button title="Go to Dashboard" onPress={() => navigation.replace("AppTabs")} />
    </View>
  )
}

export default Done