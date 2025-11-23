 
import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"
import { useTheme } from "../../../theme"
import { useNavigation, useRoute } from "@react-navigation/native"

export default function ProviderDetailScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const { provider } = route.params ?? {} // null if adding new

  const isEditing = !!provider

  const { colors, spacing, radii, typography } = useTheme()
  const styles = createStyles(colors, spacing, radii, typography)

  // INITIAL FORM VALUES (demo)
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [clinic, setClinic] = useState("")
  const [phone, setPhone] = useState("")

  // When editing → load passed provider
  useEffect(() => {
    if (isEditing) {
      setName(provider.name)
      setRole(provider.role)
      setClinic(provider.clinic)
      setPhone(provider.phone)
    }
  }, [isEditing, provider])

  function handleSave() {
    // Phase 4: POST or PUT → /providers
    Alert.alert(
      "Saved",
      isEditing
        ? "Provider details updated (demo)."
        : "New provider added (demo)."
    )

    navigation.goBack()
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View entering={FadeInUp.duration(500)}>
        <Text style={styles.heading}>
          {isEditing ? "Edit Provider" : "Add New Provider"}
        </Text>
        <Text style={styles.subheading}>
          {isEditing
            ? "Update details below."
            : "Fill out the details for your provider."}
        </Text>
      </Animated.View>

      {/* FORM FIELDS */}
      <Animated.View entering={FadeInUp.delay(150)} style={styles.fieldGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Provider name"
        />
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(300)} style={styles.fieldGroup}>
        <Text style={styles.label}>Role</Text>
        <TextInput
          value={role}
          onChangeText={setRole}
          style={styles.input}
          placeholder="GP, Nurse, Specialist..."
        />
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(450)} style={styles.fieldGroup}>
        <Text style={styles.label}>Clinic / Hospital</Text>
        <TextInput
          value={clinic}
          onChangeText={setClinic}
          style={styles.input}
          placeholder="Clinic or hospital name"
        />
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(600)} style={styles.fieldGroup}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          keyboardType="phone-pad"
          placeholder="Phone"
        />
      </Animated.View>

      {/* Save Button */}
      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.saveText}>
          {isEditing ? "Save Changes" : "Add Provider"}
        </Text>
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
      opacity: 0.8,
      marginBottom: spacing.xl,
    },

    fieldGroup: {
      marginBottom: spacing.lg,
    },

    label: {
      fontFamily: typography.medium,
      marginBottom: 6,
      fontSize: 16,
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
