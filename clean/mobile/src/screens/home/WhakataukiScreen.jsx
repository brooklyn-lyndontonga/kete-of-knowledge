import { useEffect, useState, useCallback } from "react"
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Pressable } from "react-native"
import { fetchWhakatauki } from "../../api/appApi.js"
import { colors, radii, shadow, spacing, typography } from "../../theme"

export default function WhakataukiScreen() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)

  const load = useCallback(() => {
    setError(false)
    setData(null)

    fetchWhakatauki()
      .then((list) => setData(Array.isArray(list) ? list : []))
      .catch((err) => {
        console.error("Failed to load whakataukī:", err)
        setError(true)
      })
  }, [])

  useEffect(() => {
    load()
  }, [load])

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorTitle}>{"Couldn't load whakataukī"}</Text>
        <Text style={styles.errorBody}>Check your connection and try again.</Text>
        <Pressable
          onPress={load}
          accessibilityRole="button"
          accessibilityLabel="Retry loading whakataukī"
          style={styles.retryButton}
        >
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    )
  }

  if (!data) {
    return <ActivityIndicator style={{ marginTop: 40 }} color={colors.olive} />
  }

  if (data.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorBody}>No whakataukī published yet.</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {data.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.title}>{item.text}</Text>

          {item.translation && (
            <Text style={styles.translation}>{item.translation}</Text>
          )}
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.cornsilk,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: 40,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
    gap: spacing.sm,
    backgroundColor: colors.cornsilk,
  },
  errorTitle: {
    ...typography.title,
    color: colors.text,
  },
  errorBody: {
    ...typography.body,
    color: colors.muted,
    textAlign: "center",
  },
  retryButton: {
    marginTop: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 999,
    backgroundColor: colors.olive,
  },
  retryText: {
    ...typography.bodyStrong,
    color: colors.cornsilk,
  },
  card: {
    padding: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    ...shadow.card,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  translation: {
    ...typography.body,
    color: colors.muted,
    marginTop: spacing.xs,
  },
})
