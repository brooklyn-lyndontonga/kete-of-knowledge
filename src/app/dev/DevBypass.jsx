// src/app/dev/DevBypass.jsx
import React, { useState } from "react"
import { View, Text, Platform, Pressable } from "react-native"
import Constants from "expo-constants"
import { nav, navigationRef } from "../../navigation/navigationRef"
import { useAuth } from "../../app/providers/AuthProvider"

const enabled =
  __DEV__ &&
  (process.env.EXPO_PUBLIC_DEV_BYPASS === "1" ||
   Constants?.expoConfig?.extra?.DEV_BYPASS === 1)

// prevent double-taps & ensure nav is ready
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
  const { user } = useAuth()
  const isGuest = !user
  const [open, setOpen] = useState(false)
  if (!enabled) return null

  // helpers
  const close = () => setOpen(false)
  const toggle = () => setOpen((v) => !v)

  const goOnboarding = (screen) =>
    () => {
      close()
      // Regular guarded path (requires auth) — keep if you still want it:
      if (isGuest) return nav("EmailSignIn")
      return nav("PostSignInDev", { screen })
    }

  const resetTo = (route) =>
    go(() => {
      close()
      navigationRef.reset(route)
    })

  return (
    <View pointerEvents="box-none" style={{ position: "absolute", right: 12, bottom: Platform.OS === "ios" ? 60 : 20, zIndex: 9999 }}>
      {/* Backdrop to close when menu is open */}
      {open && (
        <Pressable
          onPress={close}
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            left: -9999,
            top: -9999,
          }}
          pointerEvents="auto"
          accessibilityLabel="Close dev menu backdrop"
          accessibilityRole="button"
        />
      )}

      {/* Dropdown menu */}
      {open && (
        <View
          style={{
            marginBottom: 8,
            paddingVertical: 8,
            backgroundColor: "#fff",
            borderRadius: 12,
            minWidth: 220,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
            elevation: 8,
          }}
          accessibilityLabel="Developer quick actions"
          accessible
        >
          {/* Guest section */}
          <View style={{ paddingHorizontal: 8 }}>
            <Text style={{ fontSize: 12, opacity: 0.6, paddingHorizontal: 6, paddingBottom: 4 }}>
              Guest
            </Text>
            <MenuItem
              label="Guest Welcome"
              onPress={resetTo({
                index: 0,
                routes: [{ name: "Launch" }],
              })}
            />
            <MenuItem
              label="Guest Tabs"
              onPress={resetTo({
                index: 0,
                routes: [{ name: "AppTabs" }],
              })}
            />
            <MenuItem
              label="Magic Link (Sign in)"
              onPress={() => {
                close()
                nav("EmailSignIn")
              }}
            />
          </View>

          <View style={{ height: 8 }} />

          {/* Onboarding (requires auth) — optional keep */}
          <View style={{ paddingHorizontal: 8 }}>
            <Text style={{ fontSize: 12, opacity: 0.6, paddingHorizontal: 6, paddingBottom: 4 }}>
              Onboarding (auth required)
            </Text>
            <MenuItem label="Start (Landing)" onPress={goOnboarding("PostSignInLanding")} />
            <MenuItem label="Consent"         onPress={goOnboarding("Consent")} />
            <MenuItem label="Profile Setup"   onPress={goOnboarding("CompleteProfile")} />
            <MenuItem label="Done"            onPress={goOnboarding("Done")} />
          </View>

          <View style={{ height: 8 }} />

          {/* NEW: Onboarding no-auth preview */}
          <View style={{ paddingHorizontal: 8 }}>
            <Text style={{ fontSize: 12, opacity: 0.6, paddingHorizontal: 6, paddingBottom: 4 }}>
              Onboarding (no auth preview)
            </Text>
            <MenuItem
              label="Consent (no auth)"
              onPress={() => {
                close()
                nav("PostSignInDev", { screen: "Consent", params: { dev: true } })
              }}
            />
            <MenuItem
              label="Profile Setup (no auth)"
              onPress={() => {
                close()
                nav("PostSignInDev", { screen: "CompleteProfile", params: { dev: true } })
              }}
            />
            <MenuItem
              label="Done (no auth)"
              onPress={() => {
                close()
                nav("PostSignInDev", { screen: "Done", params: { dev: true } })
              }}
            />
          </View>

          <View style={{ height: 8 }} />

          {/* Tabs shortcuts */}
          <View style={{ paddingHorizontal: 8 }}>
            <Text style={{ fontSize: 12, opacity: 0.6, paddingHorizontal: 6, paddingBottom: 4 }}>
              Tabs
            </Text>
            <MenuItem
              label="Tabs → HomeWelcome"
              onPress={resetTo({
                index: 0,
                routes: [
                  {
                    name: "AppTabs",
                    params: { screen: "Home", params: { screen: "HomeWelcome" } },
                  },
                ],
              })}
            />
          </View>
        </View>
      )}

      {/* FAB toggle */}
      <Pressable
        onPress={toggle}
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
        accessibilityRole="button"
        accessibilityLabel={open ? "Close dev menu" : "Open dev menu"}
      >
        <Text style={{ color: "white", fontSize: 20, fontWeight: "700" }}>
          {open ? "×" : "⋮"}
        </Text>
      </Pressable>
    </View>
  )
}
