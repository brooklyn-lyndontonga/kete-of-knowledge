import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import Animated, { FadeInUp, ZoomIn } from 'react-native-reanimated'
import { useTheme } from "../../app/providers/ThemeProvider"
import { useNavigation, useRoute } from '@react-navigation/native'

export default function WelcomeBackScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const { colors, spacing, radii, typography } = useTheme()
  const styles = createStyles(colors, spacing, radii, typography)

  // If name was passed from login, use it. Otherwise fallback.
  const name = route.params?.name || 'e hoa'

  function enterApp() {
    navigation.reset({
      index: 0,
      routes: [{ name: 'AppTabs' }],
    })
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ height: 80 }} />

      {/* Icon */}
      <Animated.View entering={ZoomIn.duration(600)} style={styles.iconCircle}>
        <Text style={styles.iconText}>🌿</Text>
      </Animated.View>

      {/* Heading */}
      <Animated.View entering={FadeInUp.delay(150).duration(700).springify()}>
        <Text style={styles.heading}>Welcome back, {name}</Text>
        <Text style={styles.subheading}>
          Nau mai hoki — it&rsquo;s good to see you again.
        </Text>
      </Animated.View>

      {/* Encouragement block */}
      <Animated.View
        entering={FadeInUp.delay(300).duration(700)}
        style={styles.box}
      >
        <Text style={styles.message}>
          Your hauora journey continues. Let’s pick up where you left off.
        </Text>
      </Animated.View>

      {/* CTA */}
      <Animated.View entering={FadeInUp.delay(500).duration(700)}>
        <TouchableOpacity style={styles.button} onPress={enterApp}>
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
      width: 80,
      height: 80,
      borderRadius: 80,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginBottom: spacing.lg,
    },
    iconText: { fontSize: 36, color: '#fff' },

    heading: {
      fontFamily: typography.heading,
      fontSize: 28,
      color: colors.primary,
      textAlign: 'center',
      marginBottom: spacing.sm,
    },

    subheading: {
      fontFamily: typography.body,
      opacity: 0.85,
      textAlign: 'center',
      marginBottom: spacing.xl,
    },

    box: {
      backgroundColor: '#fff',
      padding: spacing.lg,
      borderRadius: radii.lg,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: spacing.xl,
    },

    message: {
      fontFamily: typography.body,
      fontSize: 16,
      lineHeight: 22,
      textAlign: 'center',
    },

    button: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.md,
      borderRadius: radii.lg,
      alignItems: 'center',
    },

    buttonText: {
      color: '#fff',
      fontFamily: typography.medium,
      fontSize: 18,
    },
  })
}
