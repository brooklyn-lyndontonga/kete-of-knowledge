/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../../../theme"

export default function HubHomeScreen() {
  const navigation = useNavigation()
  const { colors, spacing, radii, typography } = useTheme()

  // Demo data
  const [lastSymptom] = useState({
    name: "Fatigue",
    level: "Moderate",
    date: "Today",
  })

  const [nextMedicine] = useState({
    name: "Metformin",
    time: "8:00am",
  })

  const [hauoraFocus] = useState("Take 5 deep breaths during breaks.")

  const styles = createStyles(colors, spacing, radii, typography)

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* Header */}
      <Animated.View entering={FadeInUp.duration(600).springify()}>
        <Text style={styles.heading}>Tāku Manawa</Text>
        <Text style={styles.subheading}>Your wellbeing hub</Text>
      </Animated.View>

      {/* Quick Links */}
      <Animated.View entering={FadeInUp.delay(200).duration(600)}>
        <View style={styles.cardRow}>
          <HubCard
            title="Log Symptoms"
            emoji="📋"
            onPress={() => navigation.navigate("Symptoms")}
          />
          <HubCard
            title="My Medicines"
            emoji="💊"
            onPress={() => navigation.navigate("MyMedicines")}
          />
        </View>

        <View style={styles.cardRow}>
          <HubCard
            title="Conditions"
            emoji="❤️"
            onPress={() => navigation.navigate("ConditionList")}
          />
          <HubCard
            title="Goals"
            emoji="⭐"
            onPress={() => navigation.navigate("Goals")}
          />
        </View>
      </Animated.View>

      {/* Daily Overview */}
      <Animated.View
        entering={FadeInUp.delay(400).duration(600)}
        style={styles.section}
      >
        <Text style={styles.sectionTitle}>Daily Overview</Text>

        <View style={styles.infoCard}>
          <Text style={styles.label}>Last Symptom Logged</Text>
          <Text style={styles.value}>
            {lastSymptom.name} — {lastSymptom.level}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.label}>Next Medicine</Text>
          <Text style={styles.value}>
            {nextMedicine.name} @ {nextMedicine.time}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.label}>Your Hauora Focus</Text>
          <Text style={styles.value}>{hauoraFocus}</Text>
        </View>
      </Animated.View>

      <View style={{ height: spacing.xl }} />
    </ScrollView>
  )
}

function HubCard({ title, emoji, onPress }) {
  return (
    <TouchableOpacity style={hubCardStyles.card} onPress={onPress}>
      <Text style={hubCardStyles.emoji}>{emoji}</Text>
      <Text style={hubCardStyles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

function createStyles(colors, spacing, radii, typography) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
      padding: spacing.lg,
      paddingTop: 60,
    },
    heading: {
      fontFamily: typography.heading,
      fontSize: 28,
      color: colors.primary,
    },
    subheading: {
      fontFamily: typography.body,
      fontSize: 15,
      marginTop: 4,
      color: colors.textLight,
    },
    section: { marginTop: spacing.xl },
    sectionTitle: {
      fontFamily: typography.medium,
      fontSize: 18,
      marginBottom: spacing.md,
      color: colors.text,
    },
    cardRow: {
      flexDirection: "row",
      marginVertical: 6,
      justifyContent: "space-between",
    },
    infoCard: {
      backgroundColor: colors.accent1,
      padding: spacing.md,
      borderRadius: radii.lg,
      marginBottom: spacing.md,
    },
    label: {
      fontFamily: typography.medium,
      fontSize: 14,
      opacity: 0.8,
    },
    value: {
      marginTop: 4,
      fontFamily: typography.body,
      fontSize: 15,
    },
  })
}

const hubCardStyles = StyleSheet.create({
  card: {
    backgroundColor: "#99b7f5",
    flex: 1,
    marginHorizontal: 4,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  emoji: { fontSize: 28 },
  title: { marginTop: 6, fontWeight: "600", color: "#fff" },
})
