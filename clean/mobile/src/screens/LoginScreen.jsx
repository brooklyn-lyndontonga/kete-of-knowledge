/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react"
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"
import { useAuth } from "../auth/AuthContext"
import { colors, radii, spacing, typography } from "../theme"

export default function LoginScreen({ navigation }) {
  const { sendMagicLink } = useAuth()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleSendLink = async () => {
    if (!email) {
      setError("Please enter your email")
      return
    }

    setLoading(true)
    setError("")
    setSuccessMessage("")
    
    const result = await sendMagicLink(email)
    
    if (!result.ok) {
      setError(result.error || "Failed to send magic link")
      setLoading(false)
    } else {
      setSuccessMessage("✨ Magic link sent! Check your email (or server console) to log in.")
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>Enter your email to receive a magic link.</Text>

        <View style={styles.form}>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {successMessage ? (
            <View style={styles.successBox}>
              <Text style={styles.successText}>{successMessage}</Text>
            </View>
          ) : null}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="Enter your email"
            />
          </View>

          <Pressable
            onPress={handleSendLink}
            disabled={loading}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
              loading && styles.buttonDisabled,
            ]}
          >
            {loading ? (
              <ActivityIndicator color={colors.cornsilk} />
            ) : (
              <Text style={styles.buttonText}>Send Magic Link</Text>
            )}
          </Pressable>

          <Pressable
             style={styles.linkButton}
             onPress={() => navigation.goBack()}
           >
             <Text style={styles.linkText}>Back</Text>
           </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cornsilk,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: spacing.lg,
  },
  title: {
    ...typography.display,
    color: colors.olive,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.muted,
    marginBottom: spacing.xl,
  },
  form: {
    gap: spacing.md,
  },
  error: {
    ...typography.caption,
    color: colors.russet,
    marginBottom: spacing.sm,
  },
  successBox: {
    backgroundColor: colors.laurel,
    padding: spacing.md,
    borderRadius: radii.md,
    opacity: 0.8,
  },
  successText: {
    ...typography.body,
    color: colors.cornsilk,
    textAlign: "center"
  },
  inputGroup: {
    gap: spacing.xs,
  },
  label: {
    ...typography.caption,
    color: colors.text,
    fontWeight: "600",
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...typography.body,
  },
  button: {
    backgroundColor: colors.olive,
    padding: spacing.md,
    borderRadius: radii.md,
    alignItems: "center",
    marginTop: spacing.sm,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    ...typography.bodyStrong,
    color: colors.cornsilk,
  },
  linkButton: {
    alignItems: "center",
    padding: spacing.sm,
  },
  linkText: {
    ...typography.caption,
    color: colors.muted,
  },
})
