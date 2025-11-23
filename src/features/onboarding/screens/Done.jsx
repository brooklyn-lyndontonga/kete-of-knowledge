 
import React from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native"
import Animated, { FadeInUp, ZoomIn } from "react-native-reanimated"
import { useTheme } from "../../../theme"
import { useNavigation, useRoute } from "@react-navigation/native"

export default function Done() {
  const navigation = useNavigation()
  const route = useRoute()

  const { colors, spacing, radii, typography } = useTheme()
  const styles = createStyles(colors, spacing, radii, typography)

  const name = route.params?.name || "e hoa"

  function handleEnterApp() {
    navigation.reset({
      index: 0,
      routes: [{ name: "AppTabs" }],
    })
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ height: 80 }} />

      {/* Icon / Graphic */}
      <Animated.View
        entering={ZoomIn.duration(800)}
        style={styles.iconCircle}
      >
        <Text style={styles.iconText}>✨</Text>
      </Animated.View>

      {/* Heading */}
      <Animated.View
        entering={FadeInUp.delay(200).duration(700).springify()}
      >
        <Text style={styles.heading}>Kua ea!</Text>
        <Text style={styles.subheading}>
          Your hauora journey begins now, {name}.
        </Text>
      </Animated.View>

      {/* Body */}
      <Animated.View entering={FadeInUp.delay(400).duration(700)}>
        <Text style={styles.body}>
          You’ve set up your profile and created your space within{" "}
          <Text style={{ fontFamily: typography.medium }}>
            Kete o te Mātauranga
          </Text>
          .  
        </Text>

        <Text style={styles.body}>
          From here, you’ll be able to explore tools, track your wellbeing,
          learn from mātauranga Māori and health experts, and support your
          hauora in a way that feels true to you.
        </Text>
      </Animated.View>

      {/* CTA */}
      <Animated.View entering={FadeInUp.delay(600)}>
        <TouchableOpacity style={styles.button} onPress={handleEnterApp}>
          <Text style={styles.buttonText}>Enter My Kete</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={{ height: 120 }} />
    </ScrollView>
  )
}

function createStyles(colors, spacing, radii, typography) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
      paddingHorizontal: spacing.xl,
    },

    iconCircle: {
      backgroundColor: colors.primary,
      width: 90,
      height: 90,
      borderRadius: 90,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      marginBottom: spacing.lg,
    },

    iconText: {
      fontSize: 40,
      color: "#fff",
    },

    heading: {
      fontFamily: typography.heading,
      fontSize: 30,
      textAlign: "center",
      color: colors.primary,
      marginBottom: spacing.sm,
    },

    subheading: {
      fontFamily: typography.body,
      textAlign: "center",
      opacity: 0.85,
      marginBottom: spacing.xl,
    },

    body: {
      fontFamily: typography.body,
      fontSize: 15,
      lineHeight: 22,
      color: colors.text,
      marginBottom: spacing.md,
    },

    button: {
      marginTop: spacing.xl,
      paddingVertical: spacing.md,
      borderRadius: radii.lg,
      backgroundColor: colors.primary,
      alignItems: "center",
    },

    buttonText: {
      fontFamily: typography.medium,
      fontSize: 18,
      color: "#fff",
    },
  })
}
