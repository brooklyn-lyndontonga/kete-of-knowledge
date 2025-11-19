/* eslint-disable react/prop-types */
import React from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"
import { useTheme } from "../../../theme"

export default function ConditionDetailScreen({ route, navigation }) {
  const { condition } = route.params
  const { colors, spacing, radii, typography } = useTheme()

  const description =
    "This condition can affect the way the heart works and may cause changes in energy, breathing, or circulation. It often develops over time and may not show early symptoms."

  const symptoms = [
    "Feeling tired or low energy",
    "Shortness of breath",
    "Headaches or dizziness",
    "Changes in heartbeat",
  ]

  const helps = [
    "Regular movement or light exercise",
    "Balanced kai (low-salt, whole foods)",
    "Stress reduction and rest",
    "Regular check-ups with a provider",
  ]

  const styles = createStyles(colors, spacing, radii, typography)

  return (
    <ScrollView style={styles.container}>
      <Animated.View entering={FadeInUp.duration(500).springify()}>
        <Text style={styles.title}>
          {condition.emoji} {condition.name}
        </Text>
        <Text style={styles.maori}>{condition.maori}</Text>
      </Animated.View>

      {/* Description */}
      <Animated.View
        entering={FadeInUp.delay(150).duration(500)}
        style={styles.section}
      >
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.text}>{description}</Text>
      </Animated.View>

      {/* Symptoms */}
      <Animated.View
        entering={FadeInUp.delay(300).duration(500)}
        style={styles.section}
      >
        <Text style={styles.sectionTitle}>Common Symptoms</Text>
        {symptoms.map((s, i) => (
          <Text key={i} style={styles.text}>
            • {s}
          </Text>
        ))}
      </Animated.View>

      {/* What Helps */}
      <Animated.View
        entering={FadeInUp.delay(450).duration(500)}
        style={styles.section}
      >
        <Text style={styles.sectionTitle}>What Can Help</Text>
        {helps.map((h, i) => (
          <Text key={i} style={styles.text}>
            • {h}
          </Text>
        ))}
      </Animated.View>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Symptoms")}
      >
        <Text style={styles.buttonText}>Track Your Symptoms</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary}>
        <Text style={styles.buttonSecondaryText}>Learn More (demo)</Text>
      </TouchableOpacity>

      <View style={{ height: spacing.xl }} />
    </ScrollView>
  )
}

function createStyles(colors, spacing, radii, typography) {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      paddingTop: 60,
      backgroundColor: colors.bg,
    },
    title: {
      fontFamily: typography.heading,
      fontSize: 28,
      color: colors.primary,
    },
    maori: {
      fontFamily: typography.body,
      fontSize: 14,
      opacity: 0.8,
      marginBottom: spacing.xl,
    },
    section: {
      marginBottom: spacing.xl,
    },
    sectionTitle: {
      fontFamily: typography.medium,
      fontSize: 18,
      marginBottom: spacing.sm,
      color: colors.text,
    },
    text: {
      fontFamily: typography.body,
      fontSize: 14,
      lineHeight: 20,
      opacity: 0.85,
    },
    button: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.md,
      borderRadius: radii.lg,
      alignItems: "center",
      marginBottom: spacing.md,
    },
    buttonText: {
      color: "#fff",
      fontFamily: typography.medium,
      fontSize: 16,
    },
    buttonSecondary: {
      backgroundColor: colors.accent2,
      paddingVertical: spacing.md,
      borderRadius: radii.lg,
      alignItems: "center",
      marginBottom: spacing.md,
    },
    buttonSecondaryText: {
      color: "#fff",
      fontFamily: typography.medium,
      fontSize: 16,
    },
  })
}
