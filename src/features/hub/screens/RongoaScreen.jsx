import React from "react"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"
import { useTheme } from "../../../theme"

export default function RongoaScreen() {
  const { colors, spacing, radii, typography } = useTheme()

  const sections = [
    {
      id: 1,
      title: "Rongoā Rākau",
      subtitle: "Plant-based healing",
      emoji: "🌿",
      color: "#267f53",
      points: [
        "Kawakawa tea for calm & soothing",
        "Kūmarahou steam for breathing support",
        "Manuka oil for skin & healing",
      ],
    },
    {
      id: 2,
      title: "Mirimiri & Romiromi",
      subtitle: "Bodywork & alignment",
      emoji: "💆🏽‍♀️",
      color: "#f296bd",
      points: [
        "Gentle mirimiri for muscle release",
        "Breath-led romiromi patterns",
        "Grounding through pressure points",
      ],
    },
    {
      id: 3,
      title: "Wai & Karakia",
      subtitle: "Cleansing & spiritual grounding",
      emoji: "💧",
      color: "#99b7f5",
      points: [
        "Wai māori for resetting mauri",
        "Simple morning karakia",
        "Breath practices for hinengaro clarity",
      ],
    },
    {
      id: 4,
      title: "Hinengaro & Wairua",
      subtitle: "Heart & mind balance",
      emoji: "✨",
      color: "#fcca59",
      points: [
        "Daily reflection prompts",
        "Whakaaro journaling",
        "Finding moments of stillness",
      ],
    },
  ]

  const styles = createStyles(colors, spacing, radii, typography)

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Heading */}
      <Animated.View entering={FadeInUp.duration(500).springify()}>
        <Text style={styles.heading}>Rongoā Māori</Text>
        <Text style={styles.subheading}>
          He rongoā kei roto i tōu ao. Healing can be found in our plants,
          touch, water, breath, and wairua.
        </Text>
      </Animated.View>

      {/* Sections */}
      {sections.map((section, idx) => (
        <Animated.View
          key={section.id}
          entering={FadeInUp.delay(150 + idx * 120).duration(500)}
          style={[styles.card, { backgroundColor: section.color }]}
        >
          <Text style={styles.cardTitle}>
            {section.emoji} {section.title}
          </Text>
          <Text style={styles.cardSubtitle}>{section.subtitle}</Text>

          {section.points.map((p, i) => (
            <Text key={i} style={styles.point}>
              • {p}
            </Text>
          ))}

          <TouchableOpacity style={styles.exploreButton}>
            <Text style={styles.exploreText}>Explore More (demo)</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}

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
    card: {
      borderRadius: radii.lg,
      padding: spacing.md,
      marginBottom: spacing.lg,
    },
    cardTitle: {
      fontFamily: typography.medium,
      fontSize: 18,
      color: "#fff",
    },
    cardSubtitle: {
      fontFamily: typography.body,
      fontSize: 13,
      color: "#fff",
      opacity: 0.9,
      marginBottom: spacing.sm,
    },
    point: {
      fontFamily: typography.body,
      fontSize: 13,
      color: "#fff",
      marginVertical: 2,
    },
    exploreButton: {
      marginTop: spacing.md,
      paddingVertical: 10,
      backgroundColor: "rgba(255,255,255,0.25)",
      borderRadius: radii.md,
      alignItems: "center",
    },
    exploreText: {
      color: "#fff",
      fontFamily: typography.medium,
    },
  })
}
