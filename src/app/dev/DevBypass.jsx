import React from "react"
import { View, Button, Platform } from "react-native"
import Constants from "expo-constants"
import { nav, navigationRef } from "../../navigation/navigationRef"

const enabled =
  __DEV__ &&
  (process.env.EXPO_PUBLIC_DEV_BYPASS === "1" ||
   Constants?.expoConfig?.extra?.DEV_BYPASS === 1)

export default function DevBypass() {
  if (!enabled) return null
  return (
    <View
      style={{
        position: "absolute",
        right: 12,
        bottom: Platform.OS === "ios" ? 40 : 20,
        gap: 8,
        padding: 8,
        backgroundColor: "rgba(0,0,0,0.08)",
        borderRadius: 12,
      }}
      pointerEvents="box-none"
    >
      <Button
        title="Onboarding"
        onPress={() => nav("PostSignInDev", { screen: "PostSignInWelcome" })}
      />
      <Button
        title="Tabs"
        onPress={() => {
          // Clean reset to the tabs root; works because AppTabs is registered in all branches
          if (navigationRef.isReady()) {
            navigationRef.reset({ index: 0, routes: [{ name: "AppTabs" }] })
          }
        }}
      />
      <Button title="Sign in" onPress={() => nav("EmailSignIn")} />
    </View>
  )
}
