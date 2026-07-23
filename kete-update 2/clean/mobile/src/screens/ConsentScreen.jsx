import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { useState } from "react"

import { acceptConsent } from "../features/consent.db"
import { colors, layout, radii, spacing, typography } from "../theme"

const PRIVACY_POLICY_URL = "https://thecentreforhealth.co.nz/kete-privacy"

export default function ConsentScreen({ onAccepted }) {
  const [saving, setSaving] = useState(false)

  async function accept() {
    if (saving) return
    setSaving(true)
    try {
      await acceptConsent()
      onAccepted?.()
    } catch (err) {
      console.warn("Could not record consent:", err?.message)
      setSaving(false)
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Nau mai, haere mai</Text>
        <Text style={styles.subtitle}>Welcome to Kete of Knowledge</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Your information stays with you</Text>
        <Text style={styles.body}>
          Everything you record in this app — your profile, goals, symptoms,
          medicines, notes and contacts — is stored on this device only. It is
          not uploaded to our servers and we cannot see it.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>What we do collect</Text>
        <Text style={styles.body}>
          If you sign in, we store your email address so we can send you a
          secure sign-in link. That is all.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>This is not medical advice</Text>
        <Text style={styles.body}>
          The information in this app is for learning. It does not replace
          advice from your doctor or health provider. If you feel unwell,
          contact them or call 111.
        </Text>
      </View>

      <Pressable
        onPress={() => Linking.openURL(PRIVACY_POLICY_URL).catch(() => {})}
        style={({ pressed }) => [styles.link, pressed && styles.pressed]}
        accessibilityRole="link"
      >
        <Text style={styles.linkText}>Read the full privacy policy</Text>
      </Pressable>

      <Pressable
        onPress={accept}
        disabled={saving}
        style={({ pressed }) => [
          styles.primaryButton,
          (saving || pressed) && styles.pressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel="I understand and agree"
      >
        <Text style={styles.primaryText}>
          {saving ? "Just a moment…" : "I understand"}
        </Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.cornsilk },
  content: {
    padding: layout.screenPadding,
    gap: spacing.md,
    paddingBottom: 40,
    paddingTop: spacing.xl,
  },
  header: { gap: spacing.xs, marginBottom: spacing.sm },
  title: { ...typography.display, color: colors.olive },
  subtitle: { ...typography.body, color: colors.muted },
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.xs,
  },
  heading: { ...typography.bodyStrong, color: colors.text },
  body: { ...typography.body, color: colors.muted },
  link: {
    paddingVertical: spacing.sm,
    minHeight: 44,
    justifyContent: "center",
  },
  linkText: {
    ...typography.bodyStrong,
    color: colors.olive,
    textDecorationLine: "underline",
  },
  pressed: { opacity: 0.75 },
  primaryButton: {
    backgroundColor: colors.olive,
    borderRadius: radii.pill,
    paddingVertical: spacing.md,
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: { ...typography.bodyStrong, color: colors.cornsilk },
})
