import React, { useState } from "react"
import { View, Text, Platform, Pressable } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Constants from "expo-constants"
import { nav, navigationRef } from "../../navigation/navigationRef"

const enabled =
  __DEV__ &&
  (process.env.EXPO_PUBLIC_DEV_BYPASS === "1" ||
   Constants?.expoConfig?.extra?.DEV_BYPASS === 1)

const go = (fn) => () => {
  if (!navigationRef.isReady()) return
  requestAnimationFrame(fn)
}

function MenuItem({ label, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 8,
        backgroundColor: pressed ? "rgba(0,0,0,0.06)" : "transparent",
      })}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={{ fontSize: 14 }}>{label}</Text>
    </Pressable>
  )
}

export default function DevBypass() {
  if (!enabled) return null
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  const toggle = () => setOpen((v) => !v)
  const resetTo = (route) => go(() => { close(); navigationRef.reset(route) })

  return (
    <View pointerEvents="box-none" style={{ position: "absolute", right: 12, bottom: Platform.OS === "ios" ? 60 : 20, zIndex: 9999 }}>
      {open && (
        <Pressable
          onPress={close}
          style={{ position: "absolute", right: 0, bottom: 0, left: -9999, top: -9999 }}
          pointerEvents="auto"
          accessibilityLabel="Close dev menu backdrop"
          accessibilityRole="button"
        />
      )}

      {open && (
        <View
          style={{
            marginBottom: 8, paddingVertical: 8, backgroundColor: "#fff",
            borderRadius: 12, minWidth: 240,
            shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 8,
          }}
          accessibilityLabel="Developer quick actions"
          accessible
        >
          {/* Guest */}
          <View style={{ paddingHorizontal: 8 }}>
            <Text style={{ fontSize: 12, opacity: 0.6, paddingHorizontal: 6, paddingBottom: 4 }}>Guest</Text>
            <MenuItem label="Guest Welcome" onPress={resetTo({ index: 0, routes: [{ name: "Launch" }] })} />
            <MenuItem label="Guest Tabs" onPress={resetTo({ index: 0, routes: [{ name: "AppTabs" }] })} />
            <MenuItem label="Magic Link (Email)" onPress={() => { close(); nav("EmailSignIn") }} />
          </View>

          <View style={{ height: 8 }} />

          {/* Dev user mode override */}
          <View style={{ paddingHorizontal: 8 }}>
            <Text style={{ fontSize: 12, opacity: 0.6, paddingHorizontal: 6, paddingBottom: 4 }}>Dev user mode</Text>
            <MenuItem
              label="Force FIRST-TIME (onboarding)"
              onPress={async () => {
                await AsyncStorage.setItem("dev:onboardingMode", "first")
                close()
                nav("PostSignInDev", { screen: "Consent", params: { dev: true } })
              }}
            />
            <MenuItem
              label="Force RETURNING (tabs)"
              onPress={async () => {
                await AsyncStorage.setItem("dev:onboardingMode", "returning")
                close()
                if (navigationRef.isReady()) {
                  navigationRef.reset({ index: 0, routes: [{ name: "AppTabs" }] })
                }
              }}
            />
            <MenuItem
              label="Clear override"
              onPress={async () => {
                await AsyncStorage.removeItem("dev:onboardingMode")
                close()
              }}
            />
          </View>

          <View style={{ height: 8 }} />

          {/* Onboarding previews (no auth) */}
          <View style={{ paddingHorizontal: 8 }}>
            <Text style={{ fontSize: 12, opacity: 0.6, paddingHorizontal: 6, paddingBottom: 4 }}>Onboarding (no auth)</Text>
            <MenuItem label="Consent" onPress={() => { close(); nav("PostSignInDev", { screen: "Consent", params: { dev: true } }) }} />
            <MenuItem label="Profile Setup" onPress={() => { close(); nav("PostSignInDev", { screen: "CompleteProfile", params: { dev: true } }) }} />
            <MenuItem label="Done" onPress={() => { close(); nav("PostSignInDev", { screen: "Done", params: { dev: true } }) }} />
          </View>
        </View>
      )}

      <Pressable
        onPress={toggle}
        style={({ pressed }) => ({
          width: 48, height: 48, borderRadius: 24,
          backgroundColor: pressed ? "#1769aa" : "#1976d2",
          alignItems: "center", justifyContent: "center",
          shadowColor: "#000", shadowOpacity: 0.25, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 6,
        })}
        accessibilityRole="button"
        accessibilityLabel={open ? "Close dev menu" : "Open dev menu"}
      >
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>{open ? "×" : "⋮"}</Text>
      </Pressable>
    </View>
  )
}
