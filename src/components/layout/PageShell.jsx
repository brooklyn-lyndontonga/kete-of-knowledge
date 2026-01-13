/* eslint-disable react/prop-types */
import React from "react"
import { View, ScrollView } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "../../theme"

export default function PageShell({ children, scroll = true }) {
  const insets = useSafeAreaInsets()
  const { colors } = useTheme()

  const containerStyle = {
    flex: 1,
    backgroundColor: colors.background,
  }

  const contentStyle = {
    paddingTop: insets.top + 16,
    paddingBottom: insets.bottom + 24,
    paddingHorizontal: 16,
  }

  if (!scroll) {
    return (
      <View style={containerStyle}>
        <View style={contentStyle}>{children}</View>
      </View>
    )
  }

  return (
    <ScrollView
      style={containerStyle}
      contentContainerStyle={contentStyle}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  )
}
