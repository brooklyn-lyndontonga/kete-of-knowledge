/* eslint-disable unused-imports/no-unused-vars */
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SettingsScreen from "../../screens/settings/SettingsScreen"
import HelpScreen from "../../screens/settings/HelpScreen"

function SettingsStack() {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsHome"
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
      <Stack.Screen
        name="Help"
        component={HelpScreen}
        options={{ title: "Help & Support" }}
      />
    </Stack.Navigator>
  )
}

export default SettingsStack
