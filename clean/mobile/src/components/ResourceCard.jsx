import { View, Text, Pressable, StyleSheet, Alert, Linking } from "react-native"
import { colors, radii, shadow, spacing, typography } from "../theme"
import { API_ROOT } from "../api/apiConfig"

// Resolve whatever the admin put in file_path into an openable URL:
// - full http(s) links are used as-is
// - server-relative paths like "/uploads/foo.pdf" are prefixed with the API root
// - anything else (or empty) means the card has nothing to open
function resolveResourceUrl(filePath) {
  if (!filePath || typeof filePath !== "string") return null
  const trimmed = filePath.trim()

  if (/^https?:\/\//i.test(trimmed)) return trimmed
  if (trimmed.startsWith("/")) return `${API_ROOT}${trimmed}`

  return null
}

export default function ResourceCard({ item }) {
  const url = resolveResourceUrl(item.file_path)

  async function open() {
    if (!url) return
    try {
      const supported = await Linking.canOpenURL(url)
      if (!supported) throw new Error("Unsupported URL")
      await Linking.openURL(url)
    } catch (err) {
      console.error("Failed to open resource:", url, err)
      Alert.alert(
        "Couldn't open resource",
        "This link couldn't be opened on your device."
      )
    }
  }

  const body = (
    <>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{item.title}</Text>
        {url ? <Text style={styles.openHint}>Open ↗</Text> : null}
      </View>
      {item.description ? (
        <Text style={styles.body}>{item.description}</Text>
      ) : null}
      {item.type ? <Text style={styles.type}>{item.type}</Text> : null}
    </>
  )

  if (!url) {
    return <View style={styles.card}>{body}</View>
  }

  return (
    <Pressable
      onPress={open}
      accessibilityRole="link"
      accessibilityLabel={`Open resource: ${item.title}`}
      accessibilityHint="Opens in your browser or a viewer app"
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      {body}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    ...shadow.card,
  },
  cardPressed: {
    opacity: 0.75,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.sm,
  },
  title: {
    ...typography.bodyStrong,
    color: colors.text,
    flex: 1,
  },
  openHint: {
    ...typography.caption,
    color: colors.olive,
  },
  body: {
    ...typography.body,
    color: colors.muted,
    marginTop: 4,
  },
  type: {
    ...typography.caption,
    color: colors.muted,
    marginTop: 6,
    textTransform: "capitalize",
  },
})
