/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { Pressable, StyleSheet, Text, View } from "react-native"
import { useAuth } from "../auth/AuthContext"
import { colors, radii, spacing, typography } from "../theme"

export default function AuthScreen({ navigation }) {
  const {
    continueAsGuest,
    isGuest,
    closeAuth,
  } = useAuth()

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.kicker}>Heart Health</Text>
        <Text style={styles.title}>Kete of Knowledge</Text>
        <Text style={styles.subtitle}>
          Sign in to support your heart health journey.
        </Text>
        <Text style={styles.subtitle}>Takiuru kia manaaki i tō oranga ngākau.</Text>
      </View>

      <Pressable
        onPress={() => navigation.navigate("Login")}
        style={({ pressed }) => [
          styles.primaryButton,
          pressed && styles.primaryPressed,
        ]}
      >
        <Text style={styles.primaryText}>Continue with Email</Text>
      </Pressable>

      <Pressable
        onPress={continueAsGuest}
        style={({ pressed }) => [
          styles.secondaryButton,
          pressed && styles.secondaryPressed,
        ]}
      >
        <Text style={styles.secondaryText}>Continue as Guest</Text>
      </Pressable>

      {isGuest ? (
        <Pressable
          onPress={closeAuth}
          style={({ pressed }) => [
            styles.ghostButton,
            pressed && styles.secondaryPressed,
          ]}
        >
          <Text style={styles.ghostText}>Back to app</Text>
        </Pressable>
      ) : null}

      <Text style={styles.helper}>Magic link sign-in via Email</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cornsilk,
    padding: spacing.lg,
    justifyContent: "center",
    gap: spacing.lg,
  },
  hero: {
    gap: spacing.xs,
  },
  kicker: {
    ...typography.caption,
    color: colors.russet,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  title: {
    ...typography.display,
    color: colors.olive,
  },
  subtitle: {
    ...typography.body,
    color: colors.muted,
  },
  primaryButton: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.olive,
    alignItems: "center",
  },
  primaryPressed: {
    opacity: 0.9,
  },
  primaryText: {
    ...typography.bodyStrong,
    color: colors.cornsilk,
  },
  secondaryButton: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.meringue,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryPressed: {
    opacity: 0.9,
  },
  secondaryText: {
    ...typography.bodyStrong,
    color: colors.olive,
  },
  ghostButton: {
    paddingVertical: spacing.sm,
    alignItems: "center",
  },
  ghostText: {
    ...typography.caption,
    color: colors.muted,
  },
  helper: {
    ...typography.caption,
    color: colors.muted,
    textAlign: "center",
  },
  notice: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.meringue,
    borderWidth: 1,
    borderColor: colors.border,
  },
  noticeText: {
    ...typography.caption,
    color: colors.russet,
  },
  debugPanel: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  debugTitle: {
    ...typography.bodyStrong,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  debugItem: {
    ...typography.caption,
    color: colors.muted,
  },
})
