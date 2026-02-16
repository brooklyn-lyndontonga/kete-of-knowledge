 
import { Pressable, StyleSheet, Text, View } from "react-native"
import { useAuth } from "./AuthContext"
import { colors, radii, spacing, typography } from "../theme"

export default function GuestGate({
  title = "Sign in to continue",
  subtitle = "Takiuru kia haere tonu",
  description = "Create an account to add and save your health information.",
}) {
  const { login, authReady } = useAuth()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.description}>{description}</Text>

      <Pressable
        onPress={login}
        disabled={!authReady}
        style={({ pressed }) => [
          styles.button,
          (!authReady || pressed) && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cornsilk,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
    gap: spacing.sm,
  },
  title: {
    ...typography.title,
    color: colors.text,
    textAlign: "center",
  },
  subtitle: {
    ...typography.body,
    color: colors.muted,
    textAlign: "center",
  },
  description: {
    ...typography.caption,
    color: colors.muted,
    textAlign: "center",
  },
  button: {
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.pill,
    backgroundColor: colors.olive,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonText: {
    ...typography.bodyStrong,
    color: colors.cornsilk,
  },
})
