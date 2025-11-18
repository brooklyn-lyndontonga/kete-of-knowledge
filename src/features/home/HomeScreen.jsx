/* eslint-disable no-unused-vars */
import React, { useEffect } from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"
import { useTheme } from "../../../theme"

import WhakataukiCard from "./WhakataukiCard"
import QuickActionCard from "./QuickActionCard"
import ProgressSnapshot from "./ProgressSnapshot"
import ReflectionTile from "./ReflectionTile"

export default function HomeScreen() {
  const userName = "Brooklyn" // Replace with dynamic user context later
  const { colors, spacing, radii, typography } = useTheme()

  useEffect(() => {
    console.log("🏠 HomeScreen loaded")
  }, [])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg, // soft beige from theme
      paddingHorizontal: spacing.lg,
      paddingTop: 60,
    },
    header: { marginBottom: spacing.xl },
    greeting: {
      fontFamily: typography.heading,
      fontSize: 26,
      color: colors.primary, // calm green/teal
      marginBottom: spacing.sm,
    },
    section: { marginBottom: spacing.xl },
    sectionTitle: {
      fontFamily: typography.medium,
      fontSize: 18,
      color: colors.text,
      marginBottom: spacing.md,
    },
  })

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header + Whakataukī */}
      <Animated.View
        entering={FadeInUp.duration(600).springify()}
        style={styles.header}
      >
        <Text style={styles.greeting}>Kia ora, {userName}!</Text>
        <WhakataukiCard />
      </Animated.View>

      {/* Quick Actions */}
      <Animated.View
        entering={FadeInUp.delay(300).duration(600)}
        style={styles.section}
      >
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <QuickActionCard />
      </Animated.View>

      {/* Progress Snapshot */}
      <Animated.View
        entering={FadeInUp.delay(600).duration(600)}
        style={styles.section}
      >
        <ProgressSnapshot />
      </Animated.View>

      {/* Reflection Tile */}
      <Animated.View
        entering={FadeInUp.delay(900).duration(600)}
        style={styles.section}
      >
        <ReflectionTile />
      </Animated.View>

      {/* Bottom padding */}
      <View style={{ height: spacing.xl }} />
    </ScrollView>
  )
}
