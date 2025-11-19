import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"
import { useTheme } from "../../../theme"

export default function MovementScreen() {
  const { colors, spacing, radii, typography } = useTheme()

  const [stepsToday] = useState(4320)
  const weeklyProgress = [3200, 5000, 4100, 7000, 6500, 3000, 4320]

  const movementIdeas = [
    "10-minute morning hikoi",
    "Stretching before bed",
    "Play outside with the kids",
    "Slow jog around the block",
    "3× short movement breaks",
  ]

  const styles = createStyles(colors, spacing, radii, typography)

  return (
    <ScrollView style={styles.container}>
      <Animated.View entering={FadeInUp.duration(500).springify()}>
        <Text style={styles.heading}>Movement</Text>
        <Text style={styles.subheading}>
          He oranga ngākau, he pikinga waiora — movement supports wellbeing.
        </Text>
      </Animated.View>

      {/* Today's Steps */}
      <Animated.View entering={FadeInUp.delay(150).duration(500)} style={styles.stepsCard}>
        <Text style={styles.stepsLabel}>Steps Today</Text>
        <Text style={styles.stepsNumber}>{stepsToday.toLocaleString()}</Text>
      </Animated.View>

      {/* Weekly Progress */}
      <Text style={styles.sectionTitle}>This Week</Text>
      <View style={styles.barChart}>
        {weeklyProgress.map((value, i) => (
          <View key={i} style={styles.barWrapper}>
            <View style={[styles.bar, { height: Math.min(value / 40, 120) }]} />
            <Text style={styles.barLabel}>Day {i + 1}</Text>
          </View>
        ))}
      </View>

      {/* Movement Ideas */}
      <Text style={styles.sectionTitle}>Movement Ideas</Text>
      {movementIdeas.map((idea, i) => (
        <View key={i} style={styles.ideaCard}>
          <Text style={styles.ideaText}>• {idea}</Text>
        </View>
      ))}

      {/* CTA */}
      <TouchableOpacity style={styles.logButton}>
        <Text style={styles.logButtonText}>Log Movement (demo)</Text>
      </TouchableOpacity>

      <View style={{ height: spacing.xl * 2 }} />
    </ScrollView>
  )
}

function createStyles(colors, spacing, radii, typography) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
      paddingHorizontal: spacing.lg,
      paddingTop: 60,
    },
    heading: {
      fontFamily: typography.heading,
      fontSize: 28,
      color: colors.primary,
    },
    subheading: {
      fontFamily: typography.body,
      fontSize: 14,
      color: colors.textLight,
      marginBottom: spacing.xl,
      marginTop: 4,
    },

    stepsCard: {
      backgroundColor: colors.accent2,
      padding: spacing.lg,
      borderRadius: radii.lg,
      marginBottom: spacing.xl,
      alignItems: "center",
    },
    stepsLabel: {
      color: "#fff",
      fontFamily: typography.medium,
      fontSize: 16,
      marginBottom: 4,
    },
    stepsNumber: {
      color: "#fff",
      fontFamily: typography.heading,
      fontSize: 40,
    },

    sectionTitle: {
      fontFamily: typography.medium,
      fontSize: 18,
      color: colors.text,
      marginBottom: spacing.md,
    },

    barChart: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: spacing.xl,
    },
    barWrapper: {
      alignItems: "center",
      flex: 1,
    },
    bar: {
      width: 20,
      backgroundColor: colors.primary,
      borderRadius: 10,
      marginBottom: 6,
    },
    barLabel: {
      fontSize: 10,
      color: colors.textLight,
    },

    ideaCard: {
      backgroundColor: "#fff",
      padding: spacing.md,
      borderRadius: radii.lg,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: spacing.sm,
    },
    ideaText: {
      fontFamily: typography.body,
      fontSize: 14,
      color: colors.text,
    },

    logButton: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.md,
      borderRadius: radii.lg,
      alignItems: "center",
      marginTop: spacing.xl,
    },
    logButtonText: {
      color: "#fff",
      fontFamily: typography.medium,
      fontSize: 16,
    },
  })
}
