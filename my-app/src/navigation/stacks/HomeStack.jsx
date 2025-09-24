/* eslint-disable unused-imports/no-unused-vars */
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../../screens/HomeScreen"
import AboutScreen from "../../screens/AboutScreen"
import GettingStartedScreen from "../../screens/GettingStartedScreen"

const Stack = createNativeStackNavigator()

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: "Home" }} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="GettingStarted" component={GettingStartedScreen} />
    </Stack.Navigator>
  )
}

export default HomeStack
