import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ActivityIndicator, View } from "react-native"
import { useEffect, useState } from "react"

import AppTabs from "./AppTabs"
import AuthStack from "./AuthStack"
import ConsentScreen from "../screens/ConsentScreen"
import { hasAcceptedConsent } from "../features/consent.db.js"
import { useAuth } from "../auth/AuthContext"
import { colors } from "../theme"

const Stack = createNativeStackNavigator()

export default function RootStack() {
  const { isAuthenticated, isGuest, showAuth } = useAuth()
  const [consentChecked, setConsentChecked] = useState(false)
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    hasAcceptedConsent()
      .then(setConsented)
      .catch(() => setConsented(false))
      .finally(() => setConsentChecked(true))
  }, [])

  if (!consentChecked) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: colors.cornsilk,
        }}
      >
        <ActivityIndicator size="large" color={colors.olive} />
      </View>
    )
  }

  if (!consented) {
    return <ConsentScreen onAccepted={() => setConsented(true)} />
  }

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
