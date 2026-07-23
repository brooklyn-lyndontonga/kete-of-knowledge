import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { useEffect, useState } from "react"

import { fetchConditions } from "../../api/contentApi"
import SearchBar from "../../components/library/SearchBar"
import { colors, layout, radii, shadow, spacing, typography } from "../../theme"

export default function ConditionsScreen({ navigation }) {
  const [conditions, setConditions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [query, setQuery] = useState("")

  useEffect(() => {
    fetchConditions()
      .then((data) => setConditions(Array.isArray(data) ? data : []))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} color={colors.olive} />
  }

  const filtered = conditions.filter((c) =>
    c.title?.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Conditions</Text>
        <Text style={styles.subtitle}>Ngā mate</Text>
      </View>

      <SearchBar value={query} onChange={setQuery} />

      {error && conditions.length === 0 ? (
        <Text style={styles.empty}>
          Couldn&apos;t load conditions. Check your connection and try again.
        </Text>
      ) : null}

      {!error && filtered.length === 0 ? (
        <Text style={styles.empty}>No conditions to show yet.</Text>
      ) : null}

      {filtered.map((condition) => (
        <Pressable
          key={condition.id}
          onPress={() =>
            navigation.navigate("ConditionDetail", {
              id: condition.id,
              title: condition.title,
            })
          }
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          accessibilityRole="button"
          accessibilityLabel={`Read about ${condition.title}`}
        >
          <Text style={styles.cardTitle}>{condition.title}</Text>
          {condition.summary ? (
            <Text style={styles.cardSummary} numberOfLines={3}>
              {condition.summary}
            </Text>
          ) : null}
        </Pressable>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.cornsilk },
  content: {
    padding: layout.screenPadding,
    gap: spacing.md,
    paddingBottom: 40,
  },
  header: { gap: spacing.xs },
  title: { ...typography.display, color: colors.olive },
  subtitle: { ...typography.caption, color: colors.muted },
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.xs,
    ...shadow.card,
  },
  cardPressed: { opacity: 0.85 },
  cardTitle: { ...typography.title, color: colors.text },
  cardSummary: { ...typography.body, color: colors.muted },
  empty: {
    ...typography.body,
    color: colors.muted,
    textAlign: "center",
    marginTop: spacing.lg,
  },
})
