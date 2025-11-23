 
import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"
import { useTheme } from "../../../theme"
import { useNavigation } from "@react-navigation/native"

export default function ProfileDetailsScreen() {
  const navigation = useNavigation()
  const { colors, spacing, radii, typography } = useTheme()

  // DEMO profile values — replace with backend fetch later
  const [name, setName] = useState("Brooklyn")
  const [age, setAge] = useState("29")
  const [gender, setGender] = useState("Wāhine")

  const styles = createStyles(colors, spacing, radii, typography)

  function handleSave() {
    // Phase 4: POST → /profile/update
    Alert.alert("Saved", "Your profile has been updated (demo only).")
    navigation.goBack()
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View entering={FadeInUp.duration(500)}>
        <Text style={styles.heading}>Edit Profile</Text>
        <Text style={styles.subheading}>Update your personal details below.</Text>
      </Animated.View>

      {/* Name */}
      <Animated.View entering={FadeInUp.delay(150)} style={styles.fieldGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor={colors.textLight}
        />
      </Animated.View>

      {/* Age */}
      <Animated.View entering={FadeInUp.delay(300)} style={styles.fieldGroup}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          value={age}
          onChangeText={setAge}
          style={styles.input}
          placeholder="Enter your age"
          keyboardType="numeric"
          placeholderTextColor={colors.textLight}
        />
      </Animated.View>

      {/* Gender */}
      <Animated.View entering={FadeInUp.delay(450)} style={styles.fieldGroup}>
        <Text style={styles.label}>Gender</Text>
        <TextInput
          value={gender}
          onChangeText={setGender}
          style={styles.input}
          placeholder="Enter your gender"
          placeholderTextColor={colors.textLight}
        />
      </Animated.View>

      {/* Save */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>

      <View style={{ height: spacing.xl * 2 }} />
    </ScrollView>
  )
}

function createStyles(colors, spacing, radii, typography) {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.bg,
      paddingTop: 60,
      paddingHorizontal: spacing.lg,
    },

    heading: {
      fontFamily: typography.heading,
      fontSize: 26,
      color: colors.primary,
    },

    subheading: {
      fontFamily: typography.body,
      opacity: 0.7,
      marginBottom: spacing.xl,
    },

    fieldGroup: {
      marginBottom: spacing.lg,
    },

    label: {
      fontFamily: typography.medium,
      fontSize: 16,
      marginBottom: 6,
      color: colors.text,
    },

    input: {
      backgroundColor: "#fff",
      padding: spacing.md,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: colors.border,
      fontFamily: typography.body,
    },

    saveButton: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.md,
      borderRadius: radii.lg,
      alignItems: "center",
      marginTop: spacing.lg,
    },
    saveText: {
      color: "#fff",
      fontFamily: typography.medium,
      fontSize: 16,
    },
  })
}
