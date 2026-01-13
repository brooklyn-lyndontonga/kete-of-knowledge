import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { useTheme } from '../../theme'
import { useNavigation } from '@react-navigation/native'

export default function ConsentScreen() {
  const { colors, spacing, radii, typography } = useTheme()
  const navigation = useNavigation()
  const styles = createStyles(colors, spacing, radii, typography)

  const [agreed, setAgreed] = useState(false)

  function handleAgree() {
    if (!agreed) {
      Alert.alert('Kaua e wareware', 'Please check the box to agree.')
      return
    }

    navigation.navigate('EmailSignUp')
  }

  function handleDecline() {
    Alert.alert(
      'No Problem',
      "You can return anytime when you're ready to continue.",
      [{ text: 'Okay' }]
    )
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ height: 60 }} />

      <Animated.View entering={FadeInUp.duration(700)}>
        <Text style={styles.heading}>Informed Consent</Text>
        <Text style={styles.subheading}>
          Before you continue, we want to ensure you understand how this app
          works.
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(150)} style={styles.box}>
        <Text style={styles.text}>
          **Kete o te Mātauranga** helps you track, manage, and understand your
          hauora using tools grounded in mātauranga Māori and modern health
          practice.
        </Text>

        <Text style={styles.text}>
          To support you, the app stores information such as:
        </Text>

        <Text style={styles.bullet}>• Profile details</Text>
        <Text style={styles.bullet}>• Symptoms and health notes</Text>
        <Text style={styles.bullet}>• Medicines you use</Text>
        <Text style={styles.bullet}>• Hauora reflections and progress</Text>

        <Text style={styles.text}>
          Your data is **private**, **not sold**, and **only used to support
          your wellbeing**.
        </Text>

        <Text style={styles.text}>
          You can request a copy of your data or delete it at any time in the
          settings.
        </Text>
      </Animated.View>

      {/* Agreement */}
      <Animated.View entering={FadeInUp.delay(300)} style={styles.agreementRow}>
        <TouchableOpacity
          onPress={() => setAgreed(!agreed)}
          style={styles.checkbox}
        >
          {agreed && <View style={styles.checkboxInner} />}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>
          I understand and agree to the terms above.
        </Text>
      </Animated.View>

      {/* Buttons */}
      <Animated.View entering={FadeInUp.delay(450)} style={styles.buttonRow}>
        <TouchableOpacity style={styles.declineButton} onPress={handleDecline}>
          <Text style={styles.declineText}>Decline</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.agreeButton} onPress={handleAgree}>
          <Text style={styles.agreeText}>Agree & Continue</Text>
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
      fontSize: 28,
      color: colors.primary,
      marginBottom: spacing.sm,
    },

    subheading: {
      fontFamily: typography.body,
      opacity: 0.85,
      marginBottom: spacing.xl,
      lineHeight: 20,
    },

    box: {
      backgroundColor: '#fff',
      padding: spacing.lg,
      borderRadius: radii.lg,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: spacing.xl,
    },

    text: {
      fontFamily: typography.body,
      fontSize: 15,
      lineHeight: 22,
      color: colors.text,
      marginBottom: spacing.md,
    },

    bullet: {
      fontFamily: typography.body,
      fontSize: 15,
      marginLeft: spacing.md,
      marginBottom: spacing.xs,
    },

    agreementRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.lg,
    },

    checkbox: {
      height: 26,
      width: 26,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.md,
    },

    checkboxInner: {
      height: 14,
      width: 14,
      backgroundColor: colors.primary,
      borderRadius: 3,
    },

    checkboxLabel: {
      flex: 1,
      fontFamily: typography.body,
      fontSize: 15,
    },

    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    declineButton: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: radii.lg,
      backgroundColor: colors.border,
    },

    declineText: {
      fontFamily: typography.medium,
      color: colors.text,
    },

    agreeButton: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: radii.lg,
      backgroundColor: colors.primary,
    },

    agreeText: {
      fontFamily: typography.medium,
      color: '#fff',
    },
  })
}
