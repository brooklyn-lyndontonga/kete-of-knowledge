/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
import { Pressable, StyleSheet, Text, View } from "react-native"
import { useAuth } from "../auth/AuthContext"
import { colors, radii, spacing, typography } from "../theme"

export default function AuthScreen() {
  const {
    login,
    continueAsGuest,
    authReady,
    missingConfig,
    redirectUri,
    auth0Domain,
    auth0ClientId,
    auth0Audience,
    auth0Connection,
    isGuest,
    closeAuth,
    useProxy,
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

      {__DEV__ && missingConfig ? (
        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            Auth0 config is missing. Set
            `EXPO_PUBLIC_AUTH0_DOMAIN` and `EXPO_PUBLIC_AUTH0_CLIENT_ID`.
          </Text>
        </View>
      ) : null}

      <Pressable
        onPress={login}
        disabled={!authReady}
        style={({ pressed }) => [
          styles.primaryButton,
          (!authReady || pressed) && styles.primaryPressed,
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

      <Text style={styles.helper}>Magic link sign-in via Auth0</Text>

      {__DEV__ ? (
        <View style={styles.debugPanel}>
          <Text style={styles.debugTitle}>Auth Debug</Text>
          <Text style={styles.debugItem}>authReady: {String(authReady)}</Text>
          <Text style={styles.debugItem}>redirectUri: {redirectUri}</Text>
          <Text style={styles.debugItem}>domain: {auth0Domain || "missing"}</Text>
          <Text style={styles.debugItem}>
            clientId: {auth0ClientId ? "set" : "missing"}
          </Text>
          <Text style={styles.debugItem}>
            audience: {auth0Audience || "none"}
          </Text>
          <Text style={styles.debugItem}>
            connection: {auth0Connection || "default"}
          </Text>
          <Text style={styles.debugItem}>
            useProxy: {String(useProxy)}
          </Text>
        </View>
      ) : null}
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
