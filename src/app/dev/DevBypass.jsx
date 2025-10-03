import React, { useState } from "react"
import { View, Text, Platform, Pressable } from "react-native"
import Constants from "expo-constants"
import { nav, resetTo, navigationRef } from "../../navigation/navigationRef"

const enabled =
  __DEV__ &&
  (process.env.EXPO_PUBLIC_DEV_BYPASS === "1" ||
   Constants?.expoConfig?.extra?.DEV_BYPASS === 1)

const go = (fn) => () => {
  if (!navigationRef.isReady()) {
    console.warn("DevBypass: nav not ready yet")
    return
  }
  requestAnimationFrame(fn)
}

const Item = ({ label, onPress }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => ({
      paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8,
      backgroundColor: pressed ? "rgba(0,0,0,0.06)" : "transparent",
    })}
  >
    <Text style={{ fontSize: 14 }}>{label}</Text>
  </Pressable>
)

export default function DevBypass() {
  if (!enabled) return null
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <View pointerEvents="box-none" style={{ position: "absolute", right: 12, bottom: Platform.OS === "ios" ? 60 : 20, zIndex: 9999 }}>
      {open && (
        <Pressable
          onPress={() => setOpen(false)}
          style={{ position: "absolute", left: -9999, right: 0, top: -9999, bottom: 0 }}
          pointerEvents="auto"
        />
      )}

      {open && (
        <View style={{
          marginBottom: 8, paddingVertical: 8, backgroundColor: "#fff",
          borderRadius: 12, minWidth: 240,
          shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 8,
        }}>
          {/* Guest */}
          <View style={{ paddingHorizontal: 8 }}>
            <Text style={{ fontSize: 12, opacity: 0.6, paddingHorizontal: 6, paddingBottom: 4 }}>Guest</Text>
            <Item label="Guest Welcome" onPress={go(() => { close(); resetTo([{ name: "Launch" }]) })} />
            <Item label="Guest Tabs"    onPress={go(() => { close(); resetTo([{ name: "AppTabs" }]) })} />
            <Item label="Magic Link"    onPress={go(() => { close(); nav("EmailSignIn") })} />
          </View>

          <View style={{ height: 8 }} />

          {/* Onboarding preview (no auth required) */}
          <View style={{ paddingHorizontal: 8 }}>
            <Text style={{ fontSize: 12, opacity: 0.6, paddingHorizontal: 6, paddingBottom: 4 }}>Onboarding</Text>
            <Item label="Consent"          onPress={go(() => { close(); nav("PostSignInDev", { screen: "Consent" }) })} />
            <Item label="CompleteProfile"  onPress={go(() => { close(); nav("PostSignInDev", { screen: "CompleteProfile" }) })} />
            <Item label="Done → Tabs"      onPress={go(() => { close(); nav("PostSignInDev", { screen: "Done" }) })} />
          </View>

          <View style={{ height: 8 }} />

          {/* Tabs deep-link */}
          <View style={{ paddingHorizontal: 8 }}>
            <Text style={{ fontSize: 12, opacity: 0.6, paddingHorizontal: 6, paddingBottom: 4 }}>Tabs</Text>
            <Item
              label="Tabs → HomeWelcome"
              onPress={go(() => {
                close()
                resetTo([
                  {
                    name: "AppTabs",
                    params: { screen: "HomeTab", params: { screen: "HomeWelcome" } },
                  },
                ])
              })}
            />
          </View>
        </View>
      )}

      <Pressable
        onPress={() => setOpen(v => !v)}
        style={({ pressed }) => ({
          width: 48, height: 48, borderRadius: 24,
          backgroundColor: pressed ? "#1769aa" : "#1976d2",
          alignItems: "center", justifyContent: "center",
          shadowColor: "#000", shadowOpacity: 0.25, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 6,
        })}
      >
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>{open ? "×" : "⋮"}</Text>
      </Pressable>
    </View>
  )
}
