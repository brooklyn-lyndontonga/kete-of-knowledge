 
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import AppTabs from "./AppTabs"
import AuthStack from "./AuthStack"
import { useAuth } from "../auth/AuthContext"

const Stack = createNativeStackNavigator()

export default function RootStack() {
  const { isAuthenticated, isGuest, showAuth } = useAuth()
  const shouldShowAuth = showAuth || (!isAuthenticated && !isGuest)

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      key={shouldShowAuth ? "auth" : "app"}
    >
      {shouldShowAuth ? (
        <Stack.Screen name="Auth" component={AuthStack} />
      ) : (
        <Stack.Screen name="App" component={AppTabs} />
      )}
    </Stack.Navigator>
  )
}
