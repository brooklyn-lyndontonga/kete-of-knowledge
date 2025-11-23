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

// -------------------------------------------------------------
// DEMO RONGOĀ DATA (intern can expand later)
// -------------------------------------------------------------
const RONGOA_ITEMS = [
  {
    id: "kawakawa",
    name: "Kawakawa",
    emoji: "🌿",
    snippet: "A taonga plant used for healing, soothing, and cleansing.",
  },
  {
    id: "harakeke",
    name: "Harakeke",
    emoji: "🪶",
    snippet: "The gum and root have long been used for rongoā and weaving.",
  },
  {
    id: "manuka",
    name: "Mānuka",
    emoji: "🌸",
    snippet: "Known for antibacterial, healing, and soothing properties.",
  },
  {
    id: "kumarahou",
    name: "Kumarahou",
    emoji: "🍃",
    snippet: "Often used for chest congestion and respiratory support.",
  },
]

export default function RongoaScreen({ navigation }) {
  const { colors, spacing, radii, typography } = useTheme()
  const styles = createStyles(colors, spacing, radii, typography)

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Animated.View entering={FadeInUp.duration(600).springify()}>
        <Text style={styles.heading}>Rongoā Māori</Text>
        <Text style={styles.subheading}>
          He taonga tuku iho — traditional healing practices passed down through
          generations.
        </Text>
      </Animated.View>

      {/* Plant List */}
      {RONGOA_ITEMS.map((item, index) => (
        <Animated.View
          key={item.id}
          entering={FadeInUp.delay(200 + index * 120)}
          style={styles.card}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ResourceDetailScreen", {
                articleId: item.id,
              })
            }
          >
            <Text style={styles.cardTitle}>
              {item.emoji} {item.name}
            </Text>
            <Text style={styles.cardSnippet}>{item.snippet}</Text>
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
      padding: spacing.lg,
      paddingTop: 60,
      backgroundColor: colors.bg,
    },
    heading: {
      fontFamily: typography.heading,
      fontSize: 28,
      color: colors.primary,
    },
    subheading: {
      marginTop: 4,
      fontFamily: typography.body,
      fontSize: 14,
      opacity: 0.8,
      marginBottom: spacing.xl,
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
      fontSize: 18,
      marginBottom: 6,
      color: colors.text,
    },
    cardSnippet: {
      fontFamily: typography.body,
      fontSize: 13,
      opacity: 0.7,
    },
  })
}
