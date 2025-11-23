/* eslint-disable react/prop-types */
import React from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"
import { useTheme } from "../../../theme"

const categories = [
  {
    id: "tinana",
    name: "Tinana",
    desc: "Body & physical health",
    emoji: "🍃",
    screen: "ResourceCategory",
  },
  {
    id: "hinengaro",
    name: "Hinengaro",
    desc: "Mental wellbeing",
    emoji: "🧠",
    screen: "ResourceCategory",
  },
  {
    id: "ngakau",
    name: "Ngākau",
    desc: "Heart health",
    emoji: "❤️",
    screen: "ResourceCategory",
  },
  {
    id: "wairua",
    name: "Wairua",
    desc: "Spiritual balance & grounding",
    emoji: "🌬️",
    screen: "ResourceCategory",
  },
  {
    id: "rongoa",
    name: "Rongoā Māori",
    desc: "Traditional healing & herbs",
    emoji: "🌿",
    screen: "RongoaScreen",
  },
  {
    id: "conditions",
    name: "Conditions",
    desc: "Guides & medical information",
    emoji: "📘",
    screen: "ConditionListScreen",
  },
  {
    id: "resources",
    name: "Articles",
    desc: "Tips, guides, facts & learning",
    emoji: "🗂️",
    screen: "LibraryGuideScreen",
  },
]

export default function LibraryHomeScreen({ navigation }) {
  const { colors, spacing, radii, typography } = useTheme()
  const styles = createStyles(colors, spacing, radii, typography)

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Library</Text>
      <Text style={styles.subheading}>
        He taonga te mātauranga — explore trusted health information.
      </Text>

      <View style={styles.grid}>
        {categories.map((cat, index) => (
          <Animated.View
            key={cat.id}
            entering={FadeInUp.delay(200 + index * 100).duration(500)}
            style={styles.card}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(cat.screen, { categoryId: cat.id })
              }
            >
              <Text style={styles.cardEmoji}>{cat.emoji}</Text>
              <Text style={styles.cardTitle}>{cat.name}</Text>
              <Text style={styles.cardDesc}>{cat.desc}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      <View style={{ height: spacing.xl * 2 }} />
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
      fontSize: 28,
      color: colors.primary,
      marginBottom: 4,
    },
    subheading: {
      fontFamily: typography.body,
      fontSize: 14,
      opacity: 0.8,
      marginBottom: spacing.xl,
    },
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    card: {
      width: "48%",
      backgroundColor: "#fff",
      padding: spacing.md,
      borderRadius: radii.lg,
      marginBottom: spacing.lg,
      borderColor: colors.border,
      borderWidth: 1,
    },
    cardEmoji: {
      fontSize: 36,
      marginBottom: 6,
    },
    cardTitle: {
      fontFamily: typography.medium,
      fontSize: 16,
      marginBottom: 4,
    },
    cardDesc: {
      fontFamily: typography.body,
      fontSize: 12,
      opacity: 0.7,
    },
  })
}
