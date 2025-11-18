/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity } from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../../../theme"
import { createHomeScreenStyles } from "../../../theme/homeScreenStyles"

import WhakataukiCard from "./WhakataukiCard"
import QuickActionCard from "./QuickActionCard"
import ProgressSnapshot from "./ProgressSnapshotScreen"
import ReflectionTile from "./ReflectionTileScreen"

export default function HomeScreen() {
  const navigation = useNavigation()
  const { colors, spacing, radii, typography } = useTheme()
  const styles = createHomeScreenStyles(colors, spacing, radii, typography)

  const [userName] = useState("Brooky")

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* Header + Whakataukī */}
      <Animated.View entering={FadeInUp.duration(600).springify()}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Kia ora, {userName}!</Text>
          <WhakataukiCard />
        </View>
      </Animated.View>

      {/* Quick Actions */}
      <Animated.View
        entering={FadeInUp.delay(200).duration(600)}
        style={styles.section}
      >
        <Text style={styles.sectionTitle}>Ngā Mahi Hohoro (Quick Actions)</Text>

        <View style={styles.cardRow}>
          <QuickActionCard
            title="Log Symptoms"
            emoji="📋"
            onPress={() => navigation.navigate("Symptoms")}
          />
          <QuickActionCard
            title="My Medicines"
            emoji="💊"
            onPress={() => navigation.navigate("MyMedicines")}
          />
        </View>

        <QuickActionCard
          title="Checklist"
          emoji="☑️"
          onPress={() => navigation.navigate("Checklist")}
          style={{ marginTop: spacing.md }}
        />
      </Animated.View>

      {/* Progress Snapshot */}
      <Animated.View entering={FadeInUp.delay(400).duration(600)}>
        <ProgressSnapshot />
      </Animated.View>

      {/* Reflection */}
      <Animated.View entering={FadeInUp.delay(600).duration(600)}>
        <ReflectionTile />
      </Animated.View>

      <View style={{ height: spacing.xl }} />
    </ScrollView>
  )
}
