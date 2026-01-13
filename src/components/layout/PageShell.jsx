/* eslint-disable react/prop-types */
import React from "react"
import { View, ScrollView } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "../../theme"

export default function PageShell({ children, scroll = true }) {
  const insets = useSafeAreaInsets()
  const { colors } = useTheme()

  const content = (
    <View
      style={{
        paddingTop: insets.top + 16,
        paddingBottom: insets.bottom + 24,
        paddingHorizontal: 16,
        backgroundColor: colors.background,
        flex: 1,
      }}
    >
      {children}
    </View>
  )

  if (!scroll) {
    return content
  }

  return <ScrollView>{content}</ScrollView>
}
