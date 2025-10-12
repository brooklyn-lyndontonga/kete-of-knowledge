// src/app/dev/DevBypass.jsx
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";
import { devRoutes } from "./devRoutes";
import { useTheme } from "../providers/ThemeProvider";

const { width, height } = Dimensions.get("window");

export default function DevBypass() {
  // ✅ useTheme safely here — it’s inside a component
  const { theme } = useTheme();

  // ✅ only enable after hook
  const enabled =
    __DEV__ &&
    (process.env.EXPO_PUBLIC_DEV_BYPASS === "1" ||
      Constants?.expoConfig?.extra?.DEV_BYPASS === 1);

  if (!enabled) return null;

  const [open, setOpen] = useState(false);
  const position = useRef(new Animated.ValueXY({ x: width - 80, y: height - 180 })).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        position.setOffset({
          x: position.x._value,
          y: position.y._value,
        });
        position.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: position.x, dy: position.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        position.flattenOffset();
        Animated.spring(position, {
          toValue: {
            x: Math.min(Math.max(position.x._value, 10), width - 70),
            y: Math.min(Math.max(position.y._value, 10), height - 70),
          },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

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
  );

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
            backgroundColor: theme.colors?.card || "#fff",
            borderRadius: theme.radii?.md || 12,
            minWidth: 240,
            paddingVertical: theme.spacing?.sm || 8,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
            elevation: 8,
          }}
        >
          {/* Guest */}
          <View style={{ paddingHorizontal: theme.spacing?.sm || 8 }}>
            <Text style={{ fontSize: 12, opacity: 0.6, padding: 4 }}>Guest</Text>
            <Item label="Launch" onPress={() => { setOpen(false); devRoutes.launch(); }} />
            <Item label="Magic Link" onPress={() => { setOpen(false); devRoutes.magicLink(); }} />
            <Item label="App Tabs" onPress={() => { setOpen(false); devRoutes.appTabs(); }} />
          </View>

          <View style={{ height: 8 }} />

          {/* Onboarding */}
          <View style={{ paddingHorizontal: theme.spacing?.sm || 8 }}>
            <Text style={{ fontSize: 12, opacity: 0.6, padding: 4 }}>Onboarding</Text>
            <Item label="Consent" onPress={() => { setOpen(false); devRoutes.onboardingConsent(); }} />
            <Item label="Complete Profile" onPress={() => { setOpen(false); devRoutes.onboardingCompleteProfile(); }} />
            <Item label="Done → Tabs" onPress={() => { setOpen(false); devRoutes.onboardingDone(); }} />
          </View>

          <View style={{ height: 8 }} />

          {/* Tabs */}
          <View style={{ paddingHorizontal: theme.spacing?.sm || 8 }}>
            <Text style={{ fontSize: 12, opacity: 0.6, padding: 4 }}>Tabs</Text>
            <Item label="Home Welcome" onPress={() => { setOpen(false); devRoutes.homeWelcome(); }} />
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
    </Animated.View>
  );
}
