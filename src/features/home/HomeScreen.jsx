import React, { useEffect } from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"

import WhakataukiCard from "./WhakataukiCard"
import QuickActionCard from "./QuickActionCard"
import ProgressSnapshot from "./ProgressSnapshot"
import ReflectionTile from "./ReflectionTile"

export default function HomeScreen() {
  const userName = "Brooklyn" // Replace with dynamic user context later

  useEffect(() => {
    console.log("🏠 HomeScreen loaded")
  }, [])

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View entering={FadeInUp.duration(600).springify()} style={styles.header}>
        <Text style={styles.greeting}>Kia ora, {userName}!</Text>
        <WhakataukiCard />
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(300).duration(600)} style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <QuickActionCard />
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(600).duration(600)} style={styles.section}>
        <ProgressSnapshot />
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(900).duration(600)} style={styles.section}>
        <ReflectionTile />
      </Animated.View>

      <View style={{ height: 60 }} /> {/* Bottom padding */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  header: { marginBottom: 20 },
  greeting: {
    fontSize: 22,
    fontWeight: "700",
    color: "#267f53",
    marginBottom: 10,
  },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
})
