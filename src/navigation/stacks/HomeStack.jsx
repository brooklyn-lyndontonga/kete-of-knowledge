// src/navigation/stacks/HomeStack.jsx
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../../features/home/screens/HomeScreen"
import HomeWelcomeScreen from "../../screens/home/HomeWelcomeScreen"

function HomeStack() {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator
      initialRouteName="Home"                // 👈 important: default = Home for returning users
      screenOptions={{ headerShown: true, headerTitleAlign: "center" }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HomeWelcome" component={HomeWelcomeScreen} options={{ title: "Welcome" }} />
    </Stack.Navigator>
  )
}
export default HomeStack
