/* eslint-disable unused-imports/no-unused-vars */
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HubScreen from "../../screens/hub/HubScreen"

function HubStack() {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tāku Manawa"
        component={HubScreen}
        options={{ title: "Hub" }}
      />
    </Stack.Navigator>
  )
}

export default HubStack
