/* eslint-disable react/prop-types */
import React from "react"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"
import { useTheme } from "../../../theme"

// -----------------------------------------------------------
// 🔍 DEMO CONTENT FOR CONDITIONS
// Intern will replace this with real medical content
// -----------------------------------------------------------
const CONDITION_DETAILS = {
  asthma: {
    emoji: "🌬️",
    name: "Asthma",
    overview:
      "Asthma is a condition where the airways become inflamed and narrowed, making it hard to breathe.",
    sections: [
      {
        heading: "What Causes It?",
        text: "Asthma can be triggered by allergies, exercise, cold air, stress, smoke, or chest infections.",
      },
      {
        heading: "Common Symptoms",
        text: "Wheezing, tight chest, coughing, shortness of breath — especially at night or early morning.",
      },
      {
        heading: "Management",
        text: "Use inhalers as prescribed. Avoid known triggers. Have a written asthma action plan.",
      },
      {
        heading: "When to Seek Help",
        text: "If breathing becomes very difficult, speaking is hard, or inhalers are not helping — call 111.",
      },
    ],
  },

  diabetes: {
    emoji: "🩸",
    name: "Diabetes",
    overview:
      "Diabetes affects how your body uses sugar for energy. Blood sugar levels become too high.",
    sections: [
      {
        heading: "Types",
        text: "Type 1, Type 2, and Gestational Diabetes. Most people in NZ have Type 2.",
      },
      {
        heading: "Symptoms",
        text: "Thirst, frequent urination, blurry vision, slow healing, tiredness.",
      },
      {
        heading: "Management",
        text: "Healthy eating, movement, medication or insulin, regular blood sugar checks.",
      },
      {
        heading: "When to Seek Help",
        text: "If very thirsty, vomiting, confused, or breathing fast — seek help urgently.",
      },
    ],
  },

  hypertension: {
    emoji: "🫀",
    name: "High Blood Pressure",
    overview:
      "High blood pressure makes the heart work harder and increases risk of stroke and heart disease.",
    sections: [
      {
        heading: "Causes",
        text: "Stress, lack of movement, too much salt, genetics, other medical conditions.",
      },
      {
        heading: "Symptoms",
        text: "Often no symptoms at all — which is why it's important to get checked regularly.",
      },
      {
        heading: "Management",
        text: "Regular movement, less salt, healthy kai, medications if prescribed.",
      },
      {
        heading: "When to Seek Help",
        text: "Severe headache, chest pain, weakness on one side, or trouble speaking — call 111.",
      },
    ],
  },

  gout: {
    emoji: "🦵",
    name: "Gout",
    overview:
      "Gout is a form of arthritis caused by uric acid building up in the joints, causing sudden pain and swelling.",
    sections: [
      {
        heading: "Triggers",
        text: "Red meat, shellfish, sugary drinks, alcohol, dehydration.",
      },
      {
        heading: "Symptoms",
        text: "Intense joint pain (often big toe), redness, swelling, heat.",
      },
      {
        heading: "Management",
        text: "Medication, hydration, reducing trigger foods, and long-term uric acid–lowering medicines.",
      },
      {
        heading: "When to Seek Help",
        text: "If swelling is severe, fever happens with pain, or attacks become frequent.",
      },
    ],
  },

  "heart-disease": {
    emoji: "❤️",
    name: "Heart Disease",
    overview:
      "Heart disease includes conditions that affect the heart and blood vessels, like angina or heart failure.",
    sections: [
      {
        heading: "Risk Factors",
        text: "Smoking, high blood pressure, diabetes, high cholesterol, stress, family history.",
      },
      {
        heading: "Symptoms",
        text: "Chest pain, shortness of breath, fatigue, swelling in legs.",
      },
      {
        heading: "Management",
        text: "Healthy lifestyle, medications, cardiac rehab, and regular checkups.",
      },
      {
        heading: "When to Seek Help",
        text: "Chest pain lasting more than a few minutes — call 111 immediately.",
      },
    ],
  },
}

// -----------------------------------------------------------
// 🔥 MAIN COMPONENT
// -----------------------------------------------------------
export default function ConditionDetailScreen({ route }) {
  const { conditionId } = route.params
  const condition = CONDITION_DETAILS[conditionId]

  const { colors, spacing, radii, typography } = useTheme()
  const styles = createStyles(colors, spacing, radii, typography)

  if (!condition) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Condition not found.</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Animated.View entering={FadeInUp.duration(600).springify()}>
        <Text style={styles.title}>
          {condition.emoji} {condition.name}
        </Text>
        <Text style={styles.overview}>{condition.overview}</Text>
      </Animated.View>

      {/* Sections */}
      <View style={{ marginTop: spacing.lg }}>
        {condition.sections.map((section, idx) => (
          <Animated.View
            key={idx}
            entering={FadeInUp.delay(300 + idx * 150)}
            style={styles.sectionWrapper}
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
      marginBottom: spacing.sm,
    },
    overview: {
      fontFamily: typography.body,
      fontSize: 14,
      opacity: 0.85,
      lineHeight: 20,
    },
    sectionWrapper: {
      marginBottom: spacing.lg,
    },
    sectionHeading: {
      fontFamily: typography.medium,
      fontSize: 18,
      marginBottom: 4,
      color: colors.text,
    },
    sectionText: {
      fontFamily: typography.body,
      fontSize: 14,
      opacity: 0.8,
      lineHeight: 20,
    },
    error: {
      fontFamily: typography.medium,
      color: colors.danger,
      marginTop: spacing.xl,
    },
  })
}
