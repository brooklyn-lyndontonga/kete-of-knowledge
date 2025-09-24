/* eslint-disable unused-imports/no-unused-vars */
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SettingsScreen from "../../screens/SettingsScreen"
import HelpScreen from "../../screens/HelpScreen"
import PrivacyScreen from "../../screens/PrivacyScreen"

const Stack = createNativeStackNavigator()

function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingsHome" component={SettingsScreen} options={{ title: "Settings" }} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} />
    </Stack.Navigator>
  )
}

export default SettingsStack