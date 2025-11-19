/* eslint-disable react/prop-types */
import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"
import { useTheme } from "../../../theme"

export default function ConditionListScreen({ navigation }) {
  const { colors, spacing, radii, typography } = useTheme()

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")

  const conditions = [
    {
      id: 1,
      name: "High Blood Pressure",
      maori: "Pēhanga Toto Teitei",
      category: "Heart",
      emoji: "❤️",
      summary: "Often has no symptoms but increases heart strain.",
    },
    {
      id: 2,
      name: "High Cholesterol",
      maori: "Hūware Toto Teitei",
      category: "Heart",
      emoji: "🫀",
      summary: "Can build up in arteries and affect blood flow.",
    },
    {
      id: 3,
      name: "Type 2 Diabetes",
      maori: "Mate Huka",
      category: "Metabolic",
      emoji: "🧬",
      summary: "Affects energy use and blood sugar control.",
    },
    {
      id: 4,
      name: "Breathing Issues",
      maori: "Mate Pukupuku / Mate Hā",
      category: "Respiratory",
      emoji: "🌬️",
      summary: "Impacts lung function and oxygen levels.",
    },
  ]

  const categories = ["All", "Heart", "Metabolic", "Respiratory"]

  const filtered = conditions.filter((c) => {
    const matchesFilter = filter === "All" || c.category === filter
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.maori.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const styles = createStyles(colors, spacing, radii, typography)

  return (
    <ScrollView style={styles.container}>
      <Animated.View entering={FadeInUp.duration(500).springify()}>
        <Text style={styles.heading}>Conditions</Text>
        <Text style={styles.subheading}>
          Browse common hauora conditions to learn more.
        </Text>
      </Animated.View>

      {/* Search Bar */}
      <TextInput
        placeholder="Search conditions..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
        placeholderTextColor={colors.textLight}
      />

      {/* Filter Buttons */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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

      {/* Condition Cards */}
      {filtered.map((c, idx) => (
        <Animated.View
          key={c.id}
          entering={FadeInUp.delay(150 + idx * 100).duration(500)}
          style={styles.card}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ConditionDetail", { condition: c })
            }
          >
            <Text style={styles.cardTitle}>
              {c.emoji} {c.name}
            </Text>
            <Text style={styles.cardMaori}>{c.maori}</Text>
            <Text style={styles.cardSummary}>{c.summary}</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}

      <View style={{ height: 80 }} />
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
      marginBottom: spacing.lg,
      marginTop: 4,
    },
    searchInput: {
      backgroundColor: "#fff",
      borderRadius: radii.md,
      paddingHorizontal: spacing.md,
      paddingVertical: 12,
      borderWidth: 1,
      borderColor: colors.border,
      color: colors.text,
      marginBottom: spacing.md,
    },
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
    card: {
      backgroundColor: "#fff",
      borderRadius: radii.lg,
      padding: spacing.md,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardTitle: {
      fontFamily: typography.medium,
      fontSize: 18,
      color: colors.text,
    },
    cardMaori: {
      fontFamily: typography.body,
      fontSize: 13,
      opacity: 0.8,
      marginTop: 2,
      marginBottom: spacing.xs,
    },
    cardSummary: {
      fontFamily: typography.body,
      fontSize: 13,
      opacity: 0.8,
    },
  })
}
