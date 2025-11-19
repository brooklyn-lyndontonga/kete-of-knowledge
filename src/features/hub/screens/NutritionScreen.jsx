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

export default function NutritionScreen() {
  const { colors, spacing, radii, typography } = useTheme()

  // Demo daily kai tip
  const [dailyTip] = useState(
    "He kai kei aku ringa — nourish your body with what strengthens you."
  )

  const foodGroups = [
    {
      id: 1,
      name: "Kai Hauora (Whole Foods)",
      emoji: "🥝",
      items: [
        "Fresh fruits",
        "Vegetables",
        "Whole grains",
        "Legumes",
        "Nuts & seeds",
      ],
      color: colors.accent1,
    },
    {
      id: 2,
      name: "Fibre",
      emoji: "🌾",
      items: ["Oats", "Beans", "Lentils", "Fruit skin", "Leafy greens"],
      color: colors.accent2,
    },
    {
      id: 3,
      name: "Protein",
      emoji: "🍗",
      items: ["Eggs", "Beans", "Tofu", "Fish", "Lean meats"],
      color: "#f5793b",
    },
    {
      id: 4,
      name: "Hydration",
      emoji: "💧",
      items: ["Water", "Herbal tea", "Low-sugar drinks", "Soups"],
      color: "#99b7f5",
    },
  ]

  const mealIdeas = [
    {
      id: 1,
      title: "Heart-Healthy Breakfast",
      ideas: ["Oats + berries", "Eggs + greens", "Smoothie (banana, spinach)"],
    },
    {
      id: 2,
      title: "Simple Lunch",
      ideas: ["Chicken + veg", "Tuna salad", "Bean & rice bowl"],
    },
    {
      id: 3,
      title: "Healthy Snacks",
      ideas: ["Fruit", "Greek yoghurt", "Nuts", "Veggie sticks"],
    },
  ]

  const styles = createStyles(colors, spacing, radii, typography)

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* Header */}
      <Animated.View entering={FadeInUp.duration(600).springify()}>
        <Text style={styles.heading}>Nutrition</Text>
        <Text style={styles.subheading}>
          He oranga kai, he oranga tinana — your nourishment supports your life force.
        </Text>
      </Animated.View>

      {/* Daily Tip */}
      <Animated.View entering={FadeInUp.delay(120).duration(500)} style={styles.tipCard}>
        <Text style={styles.tipText}>{dailyTip}</Text>
      </Animated.View>

      {/* Food Groups */}
      <Text style={styles.sectionTitle}>Food Groups</Text>

      {foodGroups.map((group, index) => (
        <Animated.View
          key={group.id}
          entering={FadeInUp.delay(200 + index * 100).duration(500)}
          style={[styles.groupCard, { backgroundColor: group.color }]}
        >
          <Text style={styles.groupTitle}>
            {group.emoji} {group.name}
          </Text>

          {group.items.map((item, i) => (
            <Text key={i} style={styles.groupItem}>
              • {item}
            </Text>
          ))}
        </Animated.View>
      ))}

      {/* Meal Ideas */}
      <Text style={styles.sectionTitle}>Meal Ideas</Text>

      {mealIdeas.map((meal, index) => (
        <Animated.View
          key={meal.id}
          entering={FadeInUp.delay(450 + index * 120).duration(500)}
          style={styles.mealCard}
        >
          <Text style={styles.mealTitle}>{meal.title}</Text>

          {meal.ideas.map((idea, i) => (
            <Text key={i} style={styles.mealItem}>
              • {idea}
            </Text>
          ))}
        </Animated.View>
      ))}

      {/* Log Meal Button */}
      <TouchableOpacity style={styles.logButton}>
        <Text style={styles.logButtonText}>Log a Meal (demo)</Text>
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
    tipCard: {
      backgroundColor: colors.accent2,
      padding: spacing.md,
      borderRadius: radii.lg,
      marginBottom: spacing.lg,
    },
    tipText: {
      color: "#fff",
      fontFamily: typography.medium,
      fontSize: 15,
      lineHeight: 20,
    },

    sectionTitle: {
      fontFamily: typography.medium,
      fontSize: 18,
      color: colors.text,
      marginBottom: spacing.md,
      marginTop: spacing.md,
    },

    groupCard: {
      padding: spacing.md,
      borderRadius: radii.lg,
      marginBottom: spacing.md,
    },
    groupTitle: {
      fontFamily: typography.medium,
      fontSize: 16,
      color: "#fff",
      marginBottom: 6,
    },
    groupItem: {
      color: "#fff",
      fontFamily: typography.body,
      fontSize: 13,
      opacity: 0.9,
      marginBottom: 2,
    },

    mealCard: {
      backgroundColor: "#fff",
      padding: spacing.md,
      borderRadius: radii.lg,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    mealTitle: {
      fontFamily: typography.medium,
      fontSize: 16,
      color: colors.text,
      marginBottom: 6,
    },
    mealItem: {
      fontFamily: typography.body,
      fontSize: 13,
      opacity: 0.9,
      marginBottom: 2,
    },

    logButton: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.md,
      borderRadius: radii.lg,
      marginTop: spacing.lg,
      alignItems: "center",
    },
    logButtonText: {
      color: "#fff",
      fontFamily: typography.medium,
      fontSize: 16,
    },
  })
}
