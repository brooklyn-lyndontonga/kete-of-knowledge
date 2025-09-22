/* eslint-disable unused-imports/no-unused-vars */
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SettingsScreen from "../../screens/SettingsScreen"

const Stack = createNativeStackNavigator()

function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingsHome" component={SettingsScreen} options={{ title: "Settings" }} />
    </Stack.Navigator>
  )
}

export default SettingsStack