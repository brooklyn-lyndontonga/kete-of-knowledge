/* eslint-disable unused-imports/no-unused-vars */
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../../features/home/screens/HomeScreen"
import HomeWelcomeScreen from "../../screens/home/HomeWelcomeScreen"

function HomeStack() {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeDashboard"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="HomeWelcome"
        component={HomeWelcomeScreen}
        options={{ title: "Welcome" }}
      />
    </Stack.Navigator>
  )
}

export default HomeStack
