/* eslint-disable react/prop-types */
import { useTheme } from "../../app/providers/ThemeProvider"
import React from "react"
import { View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"


export default function PageShell({ children }) {
  const { colors, spacing } = useTheme()
  const insets = useSafeAreaInsets()

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bg,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: spacing.lg,
      }}
    >
      {children}
    </View>
  )
}
