/* eslint-disable react/prop-types */
import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"
import { useTheme } from "../../../theme"

// ------------------------------------------------------
// DEMO CONDITIONS (intern will replace with real data)
// ------------------------------------------------------
const CONDITIONS = [
  {
    id: "asthma",
    name: "Asthma",
    emoji: "🌬️",
    summary: "Breathing difficulties caused by airway inflammation.",
  },
  {
    id: "diabetes",
    name: "Diabetes",
    emoji: "🩸",
    summary: "A condition affecting blood sugar levels.",
  },
  {
    id: "hypertension",
    name: "High Blood Pressure",
    emoji: "🫀",
    summary: "When blood pressure is consistently elevated.",
  },
  {
    id: "gout",
    name: "Gout",
    emoji: "🦵",
    summary: "A painful joint condition caused by uric acid buildup.",
  },
  {
    id: "heart-disease",
    name: "Heart Disease",
    emoji: "❤️",
    summary: "Conditions affecting the heart and blood vessels.",
  },
]

export default function ConditionListScreen({ navigation }) {
  const [search, setSearch] = useState("")
  const { colors, spacing, radii, typography } = useTheme()
  const styles = createStyles(colors, spacing, radii, typography)

  const filtered = CONDITIONS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Conditions</Text>
      <Text style={styles.subheading}>
        Trusted information to help you understand your hauora.
      </Text>

      {/* Search */}
      <TextInput
        style={styles.search}
        placeholder="Search conditions..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
      />

      {/* List */}
      {filtered.map((cond, index) => (
        <Animated.View
          key={cond.id}
          entering={FadeInUp.delay(200 + index * 100)}
          style={styles.card}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ConditionDetailScreen", {
                conditionId: cond.id,
              })
            }
          >
            <Text style={styles.cardTitle}>
              {cond.emoji} {cond.name}
            </Text>
            <Text style={styles.cardSummary}>{cond.summary}</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}

      <View style={{ height: 60 }} />
    </ScrollView>
  )
}

function createStyles(colors, spacing, radii, typography) {
  return StyleSheet.create({
    container: {
      padding: spacing.lg,
      paddingTop: 60,
      backgroundColor: colors.bg,
    },
    heading: {
      fontFamily: typography.heading,
      fontSize: 26,
      color: colors.primary,
    },
    subheading: {
      fontFamily: typography.body,
      fontSize: 14,
      opacity: 0.8,
      marginBottom: spacing.lg,
    },
    search: {
      backgroundColor: "#fff",
      padding: spacing.md,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: spacing.lg,
      fontFamily: typography.body,
    },
    card: {
      backgroundColor: "#fff",
      padding: spacing.md,
      borderRadius: radii.lg,
      borderColor: colors.border,
      borderWidth: 1,
      marginBottom: spacing.md,
    },
    cardTitle: {
      fontFamily: typography.medium,
      fontSize: 16,
      marginBottom: 6,
    },
    cardSummary: {
      fontFamily: typography.body,
      fontSize: 13,
      opacity: 0.7,
    },
  })
}
