import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AuthScreen from "../screens/AuthScreen"
import AuthLoadingScreen from "../screens/AuthLoadingScreen"
import LoginScreen from "../screens/LoginScreen"
import { useAuth } from "../auth/AuthContext"

const Stack = createNativeStackNavigator()

export default function AuthStack() {
  const { isLoading, isAuthenticating } = useAuth()
  const showLoading = isLoading || isAuthenticating

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {showLoading ? (
        <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
      ) : (
        <>
          <Stack.Screen name="AuthMain" component={AuthScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  )
}
