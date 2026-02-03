/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { View, Text, TextInput, Pressable, StyleSheet } from "react-native"
import { useState } from "react"
import { saveProfile } from "../../features/profile.db.js"
import { colors, radii, spacing, typography } from "../../theme"
import { useAuth } from "../../auth/AuthContext"
import GuestGate from "../../auth/GuestGate"

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState("")
  const [dob, setDob] = useState("")
  const [healthInfo, setHealthInfo] = useState("")
  const { isGuest } = useAuth()

  async function save() {
    if (!name) return

    await saveProfile({
      name,
      dob,
      health_info: healthInfo,
      health_providers: [],
      emergency_contacts: [],
    })

    navigation.goBack()
  }

  if (isGuest) {
    return (
      <GuestGate
        title="Sign in to edit your profile"
        subtitle="Takiuru kia whakatika kōtaha"
        description="Create an account to save your profile details."
      />
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Date of birth"
        value={dob}
        onChangeText={setDob}
        style={styles.input}
      />
      <TextInput
        placeholder="Health info (conditions, allergies, etc)"
        value={healthInfo}
        onChangeText={setHealthInfo}
        multiline
        style={[styles.input, styles.inputMultiline]}
      />

      <Pressable onPress={save} style={styles.primaryButton}>
        <Text style={styles.primaryText}>Save Profile</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.md,
    backgroundColor: colors.cornsilk,
    flex: 1,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  input: {
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  inputMultiline: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  primaryButton: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.olive,
    alignItems: "center",
  },
  primaryText: {
    ...typography.bodyStrong,
    color: colors.cornsilk,
  },
})
