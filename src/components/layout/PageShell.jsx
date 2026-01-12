/* eslint-disable react/prop-types */
import React from "react"
import { ScrollView, StyleSheet } from "react-native"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { colors, spacing } from "../../theme/theme"

export default function PageShell({ children, padded = true }) {
  const insets = useSafeAreaInsets()

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          padded && {
            paddingTop: spacing.lg + insets.top,
            paddingBottom: spacing.xl + insets.bottom,
            paddingHorizontal: spacing.lg,
          },
        ]}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
  },
})
