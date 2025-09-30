import React, { useState } from "react"
import { View, Text, Pressable, Platform } from "react-native"
import Constants from "expo-constants"
import { useAuth } from "../../app/providers/AuthProvider"
import { nav, navigationRef } from "../../navigation/navigationRef"

export default function ModePill() {
  const { isGuest } = useAuth()
  const [open, setOpen] = useState(false)

  const DEV_FORCE =
    __DEV__ &&
    (process.env.EXPO_PUBLIC_FORCE_SIGNED_IN === "1" ||
     Constants?.expoConfig?.extra?.FORCE_SIGNED_IN === 1)

  const devActive = DEV_FORCE
  const bg = isGuest ? "#FFEDD5" : "#E6F7ED"
  const fg = isGuest ? "#9A3412" : "#065F46"

  const toggle = () => setOpen((v) => !v)
  const close = () => setOpen(false)
  const resetTo = (route) => () => {
    if (!navigationRef.isReady()) return
    close()
    requestAnimationFrame(() => navigationRef.reset(route))
  }

  const MenuItem = ({ label, onPress }) => (
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

  return (
    <View
      pointerEvents="box-none"
      style={{ position: "absolute", left: 12, bottom: Platform.OS === "ios" ? 60 : 20, zIndex: 9998 }}
    >
      {open && (
        <Pressable
          onPress={close}
          style={{ position: "absolute", left: -9999, right: 0, top: -9999, bottom: 0 }}
          pointerEvents="auto"
        />
      )}

      {open && (
        <View
          style={{
            marginBottom: 8, paddingVertical: 8, backgroundColor: "#fff",
            borderRadius: 12, minWidth: 240,
            shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 8,
            borderWidth: devActive ? 1 : 0, borderColor: devActive ? "#C4B5FD" : "transparent",
          }}
        >
          <View style={{ paddingHorizontal: 12, paddingBottom: 6, flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: isGuest ? "#EA580C" : "#10B981" }} />
            <Text style={{ fontWeight: "700" }}>{isGuest ? "Guest mode" : "Signed in"}</Text>
            {devActive && (
              <View style={{ marginLeft: 6, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, backgroundColor: "#EDE9FE", borderWidth: 1, borderColor: "#C4B5FD" }}>
                <Text style={{ color: "#6D28D9", fontSize: 11, fontWeight: "700" }}>DEV:mock</Text>
              </View>
            )}
          </View>

          <View style={{ paddingHorizontal: 8 }}>
            <Text style={{ fontSize: 12, opacity: 0.6, paddingHorizontal: 6, paddingBottom: 4 }}>Quick actions</Text>
            <MenuItem label="Continue with email" onPress={() => { close(); nav("EmailSignIn") }} />
            <MenuItem label="Go to Tabs (Home)" onPress={resetTo({ index: 0, routes: [{ name: "AppTabs" }] })} />
            <MenuItem label="Go to Launch" onPress={resetTo({ index: 0, routes: [{ name: "Launch" }] })} />
          </View>
        </View>
      )}

      <Pressable
        onPress={toggle}
        style={({ pressed }) => ({
          borderRadius: 999, backgroundColor: bg, paddingVertical: 6, paddingHorizontal: 12,
          opacity: pressed ? 0.9 : 1, flexDirection: "row", alignItems: "center", gap: 8,
          shadowColor: "#000", shadowOpacity: 0.12, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 3,
          borderWidth: devActive ? 1 : 0, borderColor: devActive ? "#7C3AED" : "transparent",
        })}
      >
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: isGuest ? "#EA580C" : "#10B981" }} />
        <Text style={{ color: fg, fontWeight: "700" }}>{isGuest ? "Guest" : "Signed in"}</Text>
        {devActive && <Text style={{ color: "#6D28D9", fontWeight: "700" }}> · DEV:mock</Text>}
        <Text style={{ color: fg, opacity: 0.7 }}> ▾</Text>
      </Pressable>
    </View>
  )
}
