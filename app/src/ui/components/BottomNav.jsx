/* eslint-disable react/prop-types */
import React from "react"
import { Text, Pressable } from "react-native"
import { BlurView } from "expo-blur"
import { navigation } from "../styles/navigation"

export default function BottomNav({ state, navigation: nav }) {
  return (
    <BlurView
      intensity={40}
      tint="light"
      style={navigation.container}
    >
      {state.routes.map((route, index) => {
        const isActive = state.index === index

        return (
          <Pressable
            key={route.key}
            onPress={() => nav.navigate(route.name)}
          >
            <Text
              style={[
                navigation.item,
                isActive && navigation.active,
              ]}
            >
              {route.name}
            </Text>
          </Pressable>
        )
      })}
    </BlurView>
  )
}
