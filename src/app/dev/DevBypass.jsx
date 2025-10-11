// src/app/dev/DevBypass.jsx
import React, { useState, useRef } from "react"
import {
  View,
  Text,
  Pressable,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native"
import Constants from "expo-constants"
import { devRoutes } from "./devRoutes"

const { width, height } = Dimensions.get("window")

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
  const { theme } = useTheme()
  
  if (!enabled) return null

  const [open, setOpen] = useState(false)
  const position = useRef(new Animated.ValueXY({ x: width - 80, y: height - 200 })).current

  // 🧠 Allow drag anywhere on screen
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        position.setOffset({
          x: position.x._value,
          y: position.y._value,
        })
        position.setValue({ x: 0, y: 0 })
      },
      onPanResponderMove: Animated.event([null, { dx: position.x, dy: position.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        position.flattenOffset()
        // Keep button within screen bounds
        Animated.spring(position, {
          toValue: {
            x: Math.min(Math.max(position.x._value, 10), width - 70),
            y: Math.min(Math.max(position.y._value, 10), height - 70),
          },
          useNativeDriver: false,
        }).start()
      },
    })
  ).current

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        position.getLayout(),
        {
          position: "absolute",
          zIndex: 9999,
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
    >
      {open && (
        <View
          style={{
            position: "absolute",
            bottom: 60,
            backgroundColor: "#fff",
            borderRadius: 12,
            minWidth: 240,
            paddingVertical: 8,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
            elevation: 8,
          }}
        >
          {/* Guest Routes */}
          <View style={{ paddingHorizontal: 8 }}>
            <Text style={{ fontSize: 12, opacity: 0.6, padding: 4 }}>Guest</Text>
            <Item label="Launch" onPress={() => { setOpen(false); devRoutes.launch() }} />
            <Item label="Magic Link" onPress={() => { setOpen(false); devRoutes.magicLink() }} />
            <Item label="App Tabs" onPress={() => { setOpen(false); devRoutes.appTabs() }} />
          </View>

          <View style={{ height: 8 }} />

          {/* Onboarding Routes */}
          <View style={{ paddingHorizontal: 8 }}>
            <Text style={{ fontSize: 12, opacity: 0.6, padding: 4 }}>Onboarding</Text>
            <Item label="Consent" onPress={() => { setOpen(false); devRoutes.onboardingConsent() }} />
            <Item label="CompleteProfile" onPress={() => { setOpen(false); devRoutes.onboardingCompleteProfile() }} />
            <Item label="Done → Tabs" onPress={() => { setOpen(false); devRoutes.onboardingDone() }} />
          </View>

          <View style={{ height: 8 }} />

          {/* Tabs */}
          <View style={{ paddingHorizontal: 8 }}>
            <Text style={{ fontSize: 12, opacity: 0.6, padding: 4 }}>Tabs</Text>
            <Item label="HomeWelcome" onPress={() => { setOpen(false); devRoutes.homeWelcome() }} />
          </View>
        </View>
      )}

      <Pressable
        onPress={() => setOpen(v => !v)}
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
    </Animated.View>
  )
}
