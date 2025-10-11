import React, { useState } from "react"
import { View, Text, Pressable } from "react-native"
import Constants from "expo-constants"
import { devRoutes } from "./devRoutes"

const enabled =
  __DEV__ &&
  (process.env.EXPO_PUBLIC_DEV_BYPASS === "1" ||
    Constants?.expoConfig?.extra?.DEV_BYPASS === 1)

const Item = ({ label, onPress }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => ({
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 8,
      backgroundColor: pressed ? "rgba(0,0,0,0.06)" : "transparent",
    })}
  >
    <Text style={{ fontSize: 14 }}>{label}</Text>
  </Pressable>
)

export default function DevBypass() {
  if (!enabled) return null
  const [open, setOpen] = useState(false)

  return (
    <View
      pointerEvents="box-none"
      style={{
        position: "absolute",
        right: 12,
        bottom: 24,
        zIndex: 9999,
      }}
    >
      {open && (
        <View
          style={{
            marginBottom: 8,
            paddingVertical: 8,
            backgroundColor: "#fff",
            borderRadius: 12,
            minWidth: 240,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
            elevation: 8,
          }}
        >
          <View style={{ paddingHorizontal: 8 }}>
            <Text style={{ fontSize: 12, opacity: 0.6, padding: 4 }}>
              Guest
            </Text>
            <Item label="Launch" onPress={() => { setOpen(false); devRoutes.launch() }} />
            <Item label="Magic Link" onPress={() => { setOpen(false); devRoutes.magicLink() }} />
            <Item label="App Tabs" onPress={() => { setOpen(false); devRoutes.appTabs() }} />
          </View>

          <View style={{ height: 8 }} />

          <View style={{ paddingHorizontal: 8 }}>
            <Text style={{ fontSize: 12, opacity: 0.6, padding: 4 }}>
              Onboarding
            </Text>
            <Item label="Consent" onPress={() => { setOpen(false); devRoutes.onboardingConsent() }} />
            <Item label="CompleteProfile" onPress={() => { setOpen(false); devRoutes.onboardingCompleteProfile() }} />
            <Item label="Done → Tabs" onPress={() => { setOpen(false); devRoutes.onboardingDone() }} />
          </View>

          <View style={{ height: 8 }} />

          <View style={{ paddingHorizontal: 8 }}>
            <Text style={{ fontSize: 12, opacity: 0.6, padding: 4 }}>Tabs</Text>
            <Item label="HomeWelcome" onPress={() => { setOpen(false); devRoutes.homeWelcome() }} />
          </View>
        </View>
      )}

      <Pressable
        onPress={() => setOpen((v) => !v)}
        style={({ pressed }) => ({
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: pressed ? "#1769aa" : "#1976d2",
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOpacity: 0.25,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
          elevation: 6,
        })}
      >
        <Text style={{ color: "#fff", fontSize: 22, fontWeight: "700" }}>
          {open ? "×" : "⋮"}
        </Text>
      </Pressable>
    </View>
  )
}
