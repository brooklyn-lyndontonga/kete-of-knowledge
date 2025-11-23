 
import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"
import { useTheme } from "../../../theme"
import { useNavigation } from "@react-navigation/native"

export default function EmailSignUp() {
  const { colors, spacing, radii, typography } = useTheme()
  const navigation = useNavigation()
  const styles = createStyles(colors, spacing, radii, typography)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  function handleContinue() {
    if (!name || !email) {
      Alert.alert("Arohamai", "Please enter your name and email.")
      return
    }

    // DEV: Store temporarily in navigation params
    navigation.navigate("CompleteProfile", { name, email })
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ height: 60 }} />

      {/* Header */}
      <Animated.View entering={FadeInUp.duration(700)}>
        <Text style={styles.heading}>Create your account</Text>
        <Text style={styles.subheading}>
          Let’s set up the basics so you can begin your hauora journey.
        </Text>
      </Animated.View>

      {/* Name */}
      <Animated.View entering={FadeInUp.delay(150)} style={styles.fieldGroup}>
        <Text style={styles.label}>Your Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          style={styles.input}
        />
      </Animated.View>

      {/* Email */}
      <Animated.View entering={FadeInUp.delay(300)} style={styles.fieldGroup}>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="name@example.com"
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />
      </Animated.View>

      {/* Continue */}
      <Animated.View entering={FadeInUp.delay(450)}>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Option: Already have an account */}
      <Animated.View
        entering={FadeInUp.delay(650)}
        style={styles.signInRow}
      >
        <Text style={styles.signInText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("EmailSignIn")}>
          <Text style={styles.signInLink}>Sign in</Text>
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
      textAlign: "center",
    },

    subheading: {
      fontFamily: typography.body,
      opacity: 0.85,
      marginBottom: spacing.xl,
      lineHeight: 20,
      textAlign: "center",
    },

    fieldGroup: {
      marginBottom: spacing.lg,
    },

    label: {
      fontFamily: typography.medium,
      fontSize: 16,
      marginBottom: spacing.xs,
    },

    input: {
      backgroundColor: "#fff",
      padding: spacing.md,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: colors.border,
      fontFamily: typography.body,
      fontSize: 15,
    },

    button: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.md,
      borderRadius: radii.lg,
      alignItems: "center",
      marginTop: spacing.md,
    },

    buttonText: {
      fontFamily: typography.medium,
      color: "#fff",
      fontSize: 18,
    },

    signInRow: {
      marginTop: spacing.xl,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },

    signInText: {
      fontFamily: typography.body,
      color: colors.text,
      opacity: 0.8,
      marginRight: 6,
    },

    signInLink: {
      fontFamily: typography.medium,
      color: colors.primary,
      fontSize: 15,
    },
  })
}
