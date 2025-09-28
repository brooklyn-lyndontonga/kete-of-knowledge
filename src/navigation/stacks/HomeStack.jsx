/* eslint-disable unused-imports/no-unused-vars */
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../../screens/home/HomeScreen"

function HomeStack() {
  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeDashboard"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
    </Stack.Navigator>
  )
}

export default HomeStack
