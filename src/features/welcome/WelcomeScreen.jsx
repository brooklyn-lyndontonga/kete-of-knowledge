import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { useTheme } from "../../app/providers/ThemeProvider"
import { useNavigation } from '@react-navigation/native'

export default function WelcomeScreen() {
  const { colors, spacing, radii, typography } = useTheme()
  const navigation = useNavigation()
  const styles = createStyles(colors, spacing, radii, typography)

  function handleContinue() {
    navigation.navigate('Consent')
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ height: 80 }} />

      {/* Main Header */}
      <Animated.View entering={FadeInUp.duration(700).springify()}>
        <Text style={styles.heading}>Nau mai, haere mai</Text>
        <Text style={styles.subheading}>
          Your health, wellbeing, and whānau journey — all in one place.
        </Text>
      </Animated.View>

      {/* Body Text */}
      <Animated.View
        entering={FadeInUp.delay(200).duration(700)}
        style={styles.bodyBox}
      >
        <Text style={styles.bodyText}>
          Kete o te Mātauranga is your personal wellbeing companion — guided by
          mātauranga Māori, science, and whānau-centred care.
        </Text>
        <Text style={styles.bodyText}>
          Here, your hauora is respected, protected, and uplifted. Each tool in
          this kete is designed to help you navigate your own pathway with
          clarity, strength, and support.
        </Text>
      </Animated.View>

      {/* CTA */}
      <Animated.View entering={FadeInUp.delay(400).duration(700)}>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
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

    heading: {
      fontFamily: typography.heading,
      fontSize: 30,
      textAlign: 'center',
      color: colors.primary,
      marginBottom: spacing.md,
    },

    subheading: {
      fontFamily: typography.body,
      fontSize: 16,
      textAlign: 'center',
      color: colors.text,
      opacity: 0.85,
      marginBottom: spacing.xl,
    },

    bodyBox: {
      backgroundColor: '#ffffff',
      padding: spacing.lg,
      borderRadius: radii.lg,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: spacing.xl,
    },

    bodyText: {
      fontFamily: typography.body,
      fontSize: 15,
      lineHeight: 22,
      color: colors.text,
      marginBottom: spacing.md,
    },

    button: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.md,
      borderRadius: radii.lg,
      alignItems: 'center',
      marginTop: spacing.md,
    },

    buttonText: {
      fontFamily: typography.medium,
      color: '#fff',
      fontSize: 18,
    },
  })
}
