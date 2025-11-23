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

// ---------------------------------------------------------
// DEMO CATEGORY + ARTICLE DATA
// ---------------------------------------------------------
const CATEGORY_DATA = {
  tinana: {
    title: "Tinana",
    emoji: "🍃",
    description: "Body and physical wellbeing.",
    articles: [
      {
        id: "hydration",
        title: "Staying Hydrated",
        snippet: "How water supports your daily health and energy.",
      },
      {
        id: "movement",
        title: "Daily Movement",
        snippet: "Simple ways to support physical health.",
      },
      {
        id: "kai",
        title: "Healthy Kai Choices",
        snippet: "Nutrition basics for daily wellbeing.",
      },
    ],
  },

  hinengaro: {
    title: "Hinengaro",
    emoji: "🧠",
    description: "Mental wellbeing and emotional balance.",
    articles: [
      {
        id: "stress",
        title: "Managing Stress",
        snippet: "Grounding tools you can use anytime.",
      },
      {
        id: "breathing",
        title: "Breathing for Calm",
        snippet: "Simple breathing techniques.",
      },
    ],
  },

  ngakau: {
    title: "Ngākau",
    emoji: "❤️",
    description: "Heart health and cardiovascular wellbeing.",
    articles: [
      {
        id: "blood-pressure",
        title: "Understanding Blood Pressure",
        snippet: "What your numbers mean.",
      },
      {
        id: "heart-kai",
        title: "Heart-Healthy Kai",
        snippet: "Foods that support your cardiovascular system.",
      },
    ],
  },

  wairua: {
    title: "Wairua",
    emoji: "🌬️",
    description: "Spiritual grounding and balance.",
    articles: [
      {
        id: "karakia",
        title: "Karakia for Grounding",
        snippet: "Daily karakia to uplift your wairua.",
      },
      {
        id: "values",
        title: "Values & Purpose",
        snippet: "Connecting to your deeper why.",
      },
    ],
  },

  rongoa: {
    title: "Rongoā Māori",
    emoji: "🌿",
    description: "Traditional healing and plant-based support.",
    articles: [
      {
        id: "kawakawa",
        title: "Kawakawa",
        snippet: "Uses, preparations, and healing benefits.",
      },
      {
        id: "harakeke",
        title: "Harakeke",
        snippet: "A taonga with many uses.",
      },
    ],
  },
}

// ---------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------
export default function ResourceCategoryScreen({ route, navigation }) {
  const { categoryId } = route.params
  const { colors, spacing, radii, typography } = useTheme()
  const styles = createStyles(colors, spacing, radii, typography)

  const category = CATEGORY_DATA[categoryId]

  return (
    <ScrollView style={styles.container}>
      {/* Header Banner */}
      <Animated.View entering={FadeInUp.duration(500).springify()}>
        <Text style={styles.heading}>
          {category.emoji} {category.title}
        </Text>
        <Text style={styles.subheading}>{category.description}</Text>
      </Animated.View>

      {/* Articles */}
      <View style={{ marginTop: spacing.md }}>
        {category.articles.map((article, idx) => (
          <Animated.View
            key={article.id}
            entering={FadeInUp.delay(150 + idx * 120)}
            style={styles.articleCard}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ResourceDetailScreen", {
                  categoryId,
                  articleId: article.id,
                })
              }
            >
              <Text style={styles.articleTitle}>{article.title}</Text>
              <Text style={styles.articleSnippet}>{article.snippet}</Text>
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
      fontSize: 26,
      color: colors.primary,
    },
    subheading: {
      marginTop: 4,
      fontFamily: typography.body,
      fontSize: 14,
      opacity: 0.8,
    },

    articleCard: {
      backgroundColor: "#fff",
      padding: spacing.md,
      borderRadius: radii.lg,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    articleTitle: {
      fontFamily: typography.medium,
      fontSize: 16,
      marginBottom: 6,
      color: colors.text,
    },
    articleSnippet: {
      fontFamily: typography.body,
      fontSize: 13,
      opacity: 0.7,
    },
  })
}
