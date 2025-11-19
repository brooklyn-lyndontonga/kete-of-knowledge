/* eslint-disable react/prop-types */
import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"
import { useTheme } from "../../../theme"

export default function SymptomsScreen({ navigation }) {
  const { colors, spacing, radii, typography } = useTheme()

  // Demo categories
  const categories = ["All", "Heart", "Breathing", "Energy", "Pain"]

  const [filter, setFilter] = useState("All")

  // Demo symptoms list
  const symptoms = [
    { id: 1, name: "Shortness of breath", maori: "Hā pōkai", category: "Breathing", emoji: "🌬️" },
    { id: 2, name: "Chest tightness", maori: "Kōpiritanga uma", category: "Heart", emoji: "❤️‍🔥" },
    { id: 3, name: "Low energy", maori: "Ngoikore", category: "Energy", emoji: "⚡" },
    { id: 4, name: "Dizziness", maori: "Āmaimai", category: "Heart", emoji: "🌀" },
    { id: 5, name: "Headache", maori: "Upoko mamae", category: "Pain", emoji: "🤕" },
    { id: 6, name: "Palpitations", maori: "Patupatu ngākau", category: "Heart", emoji: "💓" },
  ]

  const filteredSymptoms =
    filter === "All"
      ? symptoms
      : symptoms.filter((s) => s.category === filter)

  const styles = createStyles(colors, spacing, radii, typography)

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Animated.View entering={FadeInUp.duration(500).springify()}>
        <Text style={styles.heading}>Symptoms</Text>
        <Text style={styles.subheading}>
          Tohu hauora — keeping track helps you understand your wellbeing.
        </Text>
      </Animated.View>

      {/* Filter Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: spacing.lg }}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setFilter(cat)}
            style={[
              styles.filterPill,
              filter === cat && styles.filterPillActive,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                filter === cat && styles.filterTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Symptom Cards */}
      {filteredSymptoms.map((symptom, idx) => (
        <Animated.View
          key={symptom.id}
          entering={FadeInUp.delay(120 + idx * 120).duration(500)}
          style={styles.card}
        >
          <View>
            <Text style={styles.name}>
              {symptom.emoji} {symptom.name}
            </Text>
            <Text style={styles.maori}>{symptom.maori}</Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SymptomTracker", { symptom })
            }
            style={styles.trackButton}
          >
            <Text style={styles.trackText}>Track</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}

      {/* Add New Symptom */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Symptom (demo)</Text>
      </TouchableOpacity>

      {/* Go To Full Tracker */}
      <TouchableOpacity
        style={styles.fullButton}
        onPress={() => navigation.navigate("SymptomTracker")}
      >
        <Text style={styles.fullButtonText}>Open Symptom Tracker</Text>
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
      marginTop: 4,
      marginBottom: spacing.xl,
    },

    // Filters
    filterPill: {
      paddingVertical: 8,
      paddingHorizontal: 14,
      backgroundColor: colors.border,
      borderRadius: 20,
      marginRight: 10,
    },
    filterPillActive: {
      backgroundColor: colors.primary,
    },
    filterText: {
      fontFamily: typography.body,
      fontSize: 14,
      color: colors.text,
    },
    filterTextActive: {
      color: "#fff",
    },

    // Symptom Card
    card: {
      backgroundColor: "#fff",
      padding: spacing.md,
      borderRadius: radii.lg,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: spacing.md,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    name: {
      fontFamily: typography.medium,
      fontSize: 16,
      color: colors.text,
    },
    maori: {
      fontFamily: typography.body,
      opacity: 0.7,
      fontSize: 13,
    },

    trackButton: {
      backgroundColor: colors.primary,
      paddingVertical: 6,
      paddingHorizontal: 14,
      borderRadius: 20,
    },
    trackText: {
      color: "#fff",
      fontFamily: typography.medium,
    },

    addButton: {
      backgroundColor: colors.accent2,
      paddingVertical: spacing.md,
      borderRadius: radii.lg,
      alignItems: "center",
      marginTop: spacing.xl,
    },
    addButtonText: {
      color: "#fff",
      fontFamily: typography.medium,
      fontSize: 16,
    },

    fullButton: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.md,
      borderRadius: radii.lg,
      alignItems: "center",
      marginTop: spacing.md,
    },
    fullButtonText: {
      color: "#fff",
      fontFamily: typography.medium,
      fontSize: 16,
    },
  })
}
