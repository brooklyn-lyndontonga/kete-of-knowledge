/* eslint-disable react/react-in-jsx-scope */
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HubScreen from "../screens/HubScreen"

const Stack = createNativeStackNavigator()

export default function HubStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HubMain"
        component={HubScreen}
        options={{ title: "Hub" }}
      />
    </Stack.Navigator>
  )
}
