/* eslint-disable react/prop-types */
import React from "react"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"
import { useTheme } from "../../../theme"

// -------------------------------------------------------------
// SAME DATA STRUCTURE AS ResourceCategoryScreen BUT EXPANDED
// -------------------------------------------------------------
const ARTICLE_CONTENT = {
  hydration: {
    title: "Staying Hydrated",
    emoji: "💧",
    sections: [
      {
        heading: "Why Hydration Matters",
        text: "Water is essential for energy, digestion, mood regulation, and overall physical wellbeing. Being hydrated supports clearer thinking, better sleep, and balanced body function.",
      },
      {
        heading: "How Much Should You Drink?",
        text: "Most adults need 6–8 cups of fluid a day. This can include water, herbal teas, and hydrating foods like fruits. Your needs increase in hot weather or during activity.",
      },
      {
        heading: "Tips to Stay Hydrated",
        text: "Carry a water bottle, flavour your water with fruit, and drink small amounts often throughout the day.",
      },
    ],
    image: "https://via.placeholder.com/400x220.png?text=Hydration",
  },

  movement: {
    title: "Daily Movement",
    emoji: "🏃‍♀️",
    sections: [
      {
        heading: "Why Move Often?",
        text: "Regular movement supports blood flow, mood, energy, immunity, and healthy ageing. Even small bursts count.",
      },
      {
        heading: "Examples of Movement",
        text: "Walking, stretching, dancing, cleaning, playing with tamariki — all movement is good movement!",
      },
    ],
    image: "https://via.placeholder.com/400x220.png?text=Movement",
  },

  kai: {
    title: "Healthy Kai Choices",
    emoji: "🥝",
    sections: [
      {
        heading: "Balanced Kai",
        text: "Choose meals that include vegetables, lean protein, and whole grains. Reduce sugary drinks and processed foods.",
      },
      {
        heading: "Small Changes Matter",
        text: "Swap refined grains for whole grains, add an extra serving of veg, or include fruit as snacks.",
      },
    ],
    image: "https://via.placeholder.com/400x220.png?text=Healthy+Kai",
  },

  stress: {
    title: "Managing Stress",
    emoji: "🌿",
    sections: [
      {
        heading: "Why Stress Happens",
        text: "Stress is a natural response, but long-term stress affects mood, sleep, and overall hauora.",
      },
      {
        heading: "Simple Tools",
        text: "Try slow breathing, grounding, or stepping outside for fresh air. These small resets help calm the nervous system.",
      },
    ],
  },

  breathing: {
    title: "Breathing for Calm",
    emoji: "🌬️",
    sections: [
      {
        heading: "Breathing Matters",
        text: "Breath is deeply connected to your hinengaro and wairua. Slow breathing reduces stress and brings clarity.",
      },
      {
        heading: "Try This",
        text: "Inhale for 4 seconds, hold 2, exhale for 6. Repeat for 1 minute.",
      },
    ],
  },

  "blood-pressure": {
    title: "Understanding Blood Pressure",
    emoji: "🫀",
    sections: [
      {
        heading: "What the Numbers Mean",
        text: "Blood pressure measures how hard your heart works to pump blood. High blood pressure increases risk of stroke and heart disease.",
      },
      {
        heading: "How to Support It",
        text: "Move daily, reduce salt, manage stress, and follow medication advice if prescribed.",
      },
    ],
  },

  "heart-kai": {
    title: "Heart-Healthy Kai",
    emoji: "🥑",
    sections: [
      {
        heading: "Good Foods for Your Heart",
        text: "Vegetables, fruits, whole grains, fish, and nuts all support a healthy cardiovascular system.",
      },
      {
        heading: "Foods to Limit",
        text: "Reduce saturated fats, processed meats, and frequent takeaways.",
      },
    ],
  },

  kawakawa: {
    title: "Kawakawa",
    emoji: "🌿",
    sections: [
      {
        heading: "A Māori Healing Taonga",
        text: "Kawakawa is used traditionally for digestion, skin healing, and spiritual cleansing.",
      },
      {
        heading: "Ways to Prepare",
        text: "Tea, balms, oils, or poultices — each preparation has a different use.",
      },
    ],
  },

  harakeke: {
    title: "Harakeke",
    emoji: "🪶",
    sections: [
      {
        heading: "A Plant of Many Uses",
        text: "Harakeke supports weaving, healing, and spiritual connection. It's symbolic of whānau structure.",
      },
      {
        heading: "Medicinal Uses",
        text: "The gum can soothe skin irritations, while the root may support digestion.",
      },
    ],
  },
}

// -------------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------------
export default function ResourceDetailScreen({ route }) {
  const { articleId } = route.params
  const { colors, spacing, radii, typography } = useTheme()
  const styles = createStyles(colors, spacing, radii, typography)

  const article = ARTICLE_CONTENT[articleId]

  return (
    <ScrollView style={styles.container}>
      <Animated.View entering={FadeInUp.duration(700).springify()}>
        <Text style={styles.title}>
          {article.emoji} {article.title}
        </Text>
      </Animated.View>

      {article.image && (
        <Animated.View entering={FadeInUp.delay(200)}>
          <Image
            source={{ uri: article.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </Animated.View>
      )}

      <View style={{ marginTop: spacing.lg }}>
        {article.sections.map((section, idx) => (
          <Animated.View
            key={idx}
            entering={FadeInUp.delay(300 + idx * 150)}
            style={{ marginBottom: spacing.lg }}
          >
            <Text style={styles.sectionHeading}>{section.heading}</Text>
            <Text style={styles.sectionText}>{section.text}</Text>
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
    title: {
      fontFamily: typography.heading,
      fontSize: 28,
      color: colors.primary,
      marginBottom: spacing.md,
    },
    image: {
      width: "100%",
      height: 200,
      borderRadius: radii.lg,
      marginTop: spacing.md,
    },
    sectionHeading: {
      fontFamily: typography.medium,
      fontSize: 18,
      color: colors.text,
      marginBottom: 4,
    },
    sectionText: {
      fontFamily: typography.body,
      fontSize: 14,
      opacity: 0.8,
      lineHeight: 20,
    },
  })
}
