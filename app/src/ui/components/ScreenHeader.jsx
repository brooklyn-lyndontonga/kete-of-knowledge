/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react"
import { View } from "react-native"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { headerStyles } from "../styles/header"
import Text from "./Text"

export default function ScreenHeader({ title, children }) {
  const insets = useSafeAreaInsets()

  return (
    // FULL-BLEED HEADER BACKGROUND (fills behind notch + status bar)
    <View
      style={[
        headerStyles.background,
        { paddingTop: insets.top }, // 👈 THIS is the missing piece
      ]}
    >
      {/* Header content (safe + padded) */}
      <View style={headerStyles.content}>
        {title && <Text variant="title">{title}</Text>}
        {children}
      </View>
    </View>
  )
}
