import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { useEffect, useState } from "react"

import { fetchCondition } from "../../api/contentApi"
import { colors, layout, radii, shadow, spacing, typography } from "../../theme"
import { useLanguage } from "../../i18n/LanguageContext"

function Section({ heading, body, fallback }) {
  if (!body) return null
  return (
    <View style={styles.card}>
      <Text style={styles.cardHeading} accessibilityRole="header">
        {heading}
      </Text>
      <Text style={styles.cardBody}>{body}</Text>
      {fallback ? <Text style={styles.fallbackNote}>English only</Text> : null}
    </View>
  )
}

export default function ConditionDetailScreen({ route }) {
  const { id } = route.params || {}
  const [condition, setCondition] = useState(null)
  const [loading, setLoading] = useState(true)
  const { t, content, isFallback } = useLanguage()

  useEffect(() => {
    fetchCondition(id)
      .then(setCondition)
      .catch(() => setCondition(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} color={colors.olive} />
  }

  if (!condition) {
    return (
      <View style={styles.emptyWrap}>
        <Text style={styles.empty}>{t("condition.offline")}</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title} accessibilityRole="header">
          {content(condition, "title")}
        </Text>
      </View>

      <Section
        heading={t("condition.about")}
        body={content(condition, "summary")}
        fallback={isFallback(condition, "summary")}
      />
      <Section
        heading={t("condition.triggers")}
        body={content(condition, "triggers")}
        fallback={isFallback(condition, "triggers")}
      />
      <Section
        heading={t("condition.managing")}
        body={content(condition, "treatments")}
        fallback={isFallback(condition, "treatments")}
      />

      <Text style={styles.disclaimer}>{t("condition.disclaimer")}</Text>
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
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.xs,
    ...shadow.card,
  },
  cardHeading: { ...typography.title, color: colors.text },
  fallbackNote: { ...typography.caption, color: colors.camel },
  cardBody: { ...typography.body, color: colors.text, marginTop: spacing.xs },
  disclaimer: {
    ...typography.caption,
    color: colors.russet,
    backgroundColor: colors.meringue,
    borderRadius: radii.md,
    padding: spacing.md,
    lineHeight: 19,
  },
  emptyWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
    backgroundColor: colors.cornsilk,
  },
  empty: { ...typography.body, color: colors.muted, textAlign: "center" },
})
