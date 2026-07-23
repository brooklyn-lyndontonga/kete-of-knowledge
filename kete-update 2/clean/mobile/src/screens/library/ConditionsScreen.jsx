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
import { useLanguage } from "../../i18n/LanguageContext"

export default function ConditionsScreen({ navigation }) {
  const [conditions, setConditions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [query, setQuery] = useState("")
  const { t, content, isFallback } = useLanguage()

  useEffect(() => {
    fetchConditions()
      .then((data) => setConditions(Array.isArray(data) ? data : []))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} color={colors.olive} />
  }

  const filtered = conditions.filter((c) => {
    const needle = query.toLowerCase()
    return (
      content(c, "title").toLowerCase().includes(needle) ||
      (c.title || "").toLowerCase().includes(needle)
    )
  })

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>{t("library.conditions")}</Text>
        <Text style={styles.subtitle}>{t("library.title")}</Text>
      </View>

      <SearchBar value={query} onChange={setQuery} />

      {error && conditions.length === 0 ? (
        <Text style={styles.empty}>{t("library.loadError")}</Text>
      ) : null}

      {!error && filtered.length === 0 ? (
        <Text style={styles.empty}>{t("library.empty")}</Text>
      ) : null}

      {filtered.map((condition) => (
        <Pressable
          key={condition.id}
          onPress={() =>
            navigation.navigate("ConditionDetail", {
              id: condition.id,
              title: content(condition, "title"),
            })
          }
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          accessibilityRole="button"
          accessibilityLabel={`${t("condition.about")} ${content(condition, "title")}`}
        >
          <Text style={styles.cardTitle}>{content(condition, "title")}</Text>
          {content(condition, "summary") ? (
            <Text style={styles.cardSummary} numberOfLines={3}>
              {content(condition, "summary")}
            </Text>
          ) : null}
          {isFallback(condition, "summary") ? (
            <Text style={styles.fallbackNote}>English only</Text>
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
  fallbackNote: {
    ...typography.caption,
    color: colors.camel,
  },
  empty: {
    ...typography.body,
    color: colors.muted,
    textAlign: "center",
    marginTop: spacing.lg,
  },
})
