/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
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
import { useNavigation, useRoute } from "@react-navigation/native"

export default function CompleteProfile() {
  const navigation = useNavigation()
  const route = useRoute()

  const { colors, spacing, radii, typography } = useTheme()
  const styles = createStyles(colors, spacing, radii, typography)

  // Pre-filled data from previous screen
  const initialName = route.params?.name || ""
  const initialEmail = route.params?.email || ""

  // Inputs
  const [name, setName] = useState(initialName)
  const [email, setEmail] = useState(initialEmail)
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [whanauRole, setWhanauRole] = useState("")

  function handleContinue() {
    if (!age || !gender) {
      Alert.alert("Arohamai", "Please fill out all required fields.")
      return
    }

    navigation.navigate("Done", {
      name,
      email,
      age,
      gender,
      whanauRole,
    })
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ height: 60 }} />

      {/* Header */}
      <Animated.View entering={FadeInUp.duration(700)}>
        <Text style={styles.heading}>Complete Your Profile</Text>
        <Text style={styles.subheading}>
          A few more details will help personalise your hauora journey.
        </Text>
      </Animated.View>

      {/* Name */}
      <Animated.View entering={FadeInUp.delay(100)} style={styles.fieldGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Your name"
        />
      </Animated.View>

      {/* Email */}
      <Animated.View entering={FadeInUp.delay(200)} style={styles.fieldGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
          placeholder="name@example.com"
        />
      </Animated.View>

      {/* Age */}
      <Animated.View entering={FadeInUp.delay(300)} style={styles.fieldGroup}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          value={age}
          onChangeText={setAge}
          keyboardType="number-pad"
          style={styles.input}
          placeholder="e.g., 29"
        />
      </Animated.View>

      {/* Gender */}
      <Animated.View entering={FadeInUp.delay(400)} style={styles.fieldGroup}>
        <Text style={styles.label}>Gender</Text>
        <TextInput
          value={gender}
          onChangeText={setGender}
          style={styles.input}
          placeholder="Wahine, Tāne, Non-binary, etc."
        />
      </Animated.View>

      {/* Whānau Role */}
      <Animated.View entering={FadeInUp.delay(500)} style={styles.fieldGroup}>
        <Text style={styles.label}>Whānau Role (optional)</Text>
        <TextInput
          value={whanauRole}
          onChangeText={setWhanauRole}
          style={styles.input}
          placeholder="e.g., Māmā, Kaitiaki, Tuakana..."
        />
      </Animated.View>

      {/* Continue */}
      <Animated.View entering={FadeInUp.delay(650)}>
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
      fontSize: 28,
      textAlign: "center",
      color: colors.primary,
      marginBottom: spacing.sm,
    },

    subheading: {
      fontFamily: typography.body,
      opacity: 0.85,
      marginBottom: spacing.xl,
      textAlign: "center",
    },

    fieldGroup: {
      marginBottom: spacing.lg,
    },

    label: {
      fontFamily: typography.medium,
      fontSize: 16,
      marginBottom: 6,
    },

    input: {
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.md,
      borderRadius: radii.md,
      fontFamily: typography.body,
      fontSize: 15,
    },

    button: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.md,
      borderRadius: radii.lg,
      alignItems: "center",
      marginTop: spacing.lg,
    },

    buttonText: {
      color: "#fff",
      fontFamily: typography.medium,
      fontSize: 18,
    },
  })
}
