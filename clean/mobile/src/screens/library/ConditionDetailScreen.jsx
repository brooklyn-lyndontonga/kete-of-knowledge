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

function Section({ heading, reo, body }) {
  if (!body) return null
  return (
    <View style={styles.card}>
      <Text style={styles.cardHeading}>{heading}</Text>
      <Text style={styles.cardReo}>{reo}</Text>
      <Text style={styles.cardBody}>{body}</Text>
    </View>
  )
}

export default function ConditionDetailScreen({ route }) {
  const { id } = route.params || {}
  const [condition, setCondition] = useState(null)
  const [loading, setLoading] = useState(true)

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
        <Text style={styles.empty}>
          This information isn&apos;t available offline yet.
        </Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>{condition.title}</Text>
      </View>

      <Section
        heading="About"
        reo="Mō tēnei"
        body={condition.summary}
      />
      <Section
        heading="Triggers"
        reo="Ngā take"
        body={condition.triggers}
      />
      <Section
        heading="Managing this"
        reo="Te whakahaere"
        body={condition.treatments}
      />

      <Text style={styles.disclaimer}>
        This information is for learning and does not replace advice from your
        doctor or health provider. If you feel unwell, contact them or call 111.
      </Text>
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
  cardReo: { ...typography.caption, color: colors.muted },
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
