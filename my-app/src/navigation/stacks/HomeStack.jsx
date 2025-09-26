/* eslint-disable unused-imports/no-unused-vars */
// src/navigation/stacks/HomeStack.jsx
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ModeChooser from "../../screens/home/ModeChooser" // Home shows mode chooser for now

const Stack = createNativeStackNavigator()

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMain"
        component={ModeChooser}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default HomeStack
