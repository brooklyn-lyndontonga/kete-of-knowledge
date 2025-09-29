import React from "react"
import { View, Button, Platform } from "react-native"
import Constants from "expo-constants"
import { nav, navigationRef } from "../../navigation/navigationRef"

const enabled =
  __DEV__ &&
  (process.env.EXPO_PUBLIC_DEV_BYPASS === "1" ||
   Constants?.expoConfig?.extra?.DEV_BYPASS === 1)

// Prevent double taps & ensure nav is ready
const go = (fn) => () => {
  if (!navigationRef.isReady()) return
  requestAnimationFrame(fn)
}

export default function DevBypass() {
  if (!enabled) return null
  return (
    <View
      style={{
        position: "absolute",
        right: 12,
        bottom: Platform.OS === "ios" ? 60 : 20, // a bit more room on iOS
        padding: 6,
        backgroundColor: "rgba(0,0,0,0.08)",
        borderRadius: 12,
        zIndex: 9999,
        gap: 6,
      }}
      pointerEvents="box-none"
    >
      <Button
        accessibilityLabel="Go to welcome screen"
        title="Guest Welcome"
        onPress={go(() =>
          navigationRef.reset({ index: 0, routes: [{ name: "Launch" }] })
        )}
      />
      
      <Button
        accessibilityLabel="Reset to app tabs"
        title="Guest Tabs"
        onPress={go(() =>
          navigationRef.reset({ index: 0, routes: [{ name: "AppTabs" }] })
        )}
      />
      <Button
        accessibilityLabel="Open email sign-in"
        title="Magic Link"
        onPress={() => nav("EmailSignIn")}
      />
      <Button title="Full Welcome"   onPress={() => nav("PostSignInDev", { screen: "PostSignInWelcome" })} />
<Button title="Consent page"   onPress={() => nav("PostSignInDev", { screen: "Consent" })} />
<Button title="Profile Setup"   onPress={() => nav("PostSignInDev", { screen: "CompleteProfile" })} />
<Button title="Done"      onPress={() => nav("PostSignInDev", { screen: "Done" })} />

    </View>
  )
}
