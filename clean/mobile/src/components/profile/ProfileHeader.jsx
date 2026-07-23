import { View, Text, Pressable, Image, StyleSheet } from "react-native"
import { useEffect, useState } from "react"
import * as ImagePicker from "expo-image-picker"
import { getProfile, saveProfile } from "../../features/profile.db.js"
import { colors, radii, shadow, spacing, typography } from "../../theme"

export default function ProfileHeader({ onEdit }) {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    getProfile().then(setProfile)
  }, [])

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    })

    if (!result.canceled) {
      const uri = result.assets[0].uri

      await saveProfile({
        ...profile,
        photo_uri: uri,
      })

      setProfile({ ...profile, photo_uri: uri })
    }
  }

  if (!profile) {
    return (
      <View style={styles.emptyCard}>
        <Text style={styles.emptyTitle}>No profile yet</Text>
        <Text style={styles.emptySubtitle}>
          Create your kōtaha to personalise your journey.
        </Text>
        <Pressable
          onPress={onEdit}
          style={styles.linkButton}
          accessibilityRole="button"
        >
          <Text style={styles.linkText}>Create profile</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.card}>
      {/* 🧑 Avatar */}
      <Pressable onPress={pickImage} accessibilityRole="button">
        {profile.photo_uri ? (
          <Image source={{ uri: profile.photo_uri }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarPlus}>+</Text>
          </View>
        )}
      </Pressable>

      {/* 👤 Info */}
      <View style={styles.info}>
        <Text style={styles.name}>{profile.name}</Text>

        {profile.dob && <Text style={styles.meta}>DOB: {profile.dob}</Text>}

        <Pressable
          onPress={onEdit}
          style={styles.linkButton}
          accessibilityRole="button"
        >
          <Text style={styles.linkText}>Edit profile</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "center",
    ...shadow.card,
  },
  emptyCard: {
    padding: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
    ...shadow.card,
  },
  emptyTitle: {
    ...typography.title,
    color: colors.text,
  },
  emptySubtitle: {
    ...typography.body,
    color: colors.muted,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: colors.laurel,
  },
  avatarPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.meringue,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarPlus: {
    ...typography.title,
    color: colors.olive,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  name: {
    ...typography.title,
    color: colors.text,
  },
  meta: {
    ...typography.caption,
    color: colors.muted,
  },
  linkButton: {
    alignSelf: "flex-start",
    paddingVertical: 6,
  },
  linkText: {
    ...typography.bodyStrong,
    color: colors.olive,
  },
})
