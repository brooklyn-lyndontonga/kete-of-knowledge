 
import {
  ScrollView,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
  Pressable,
} from "react-native"
import { useEffect, useState } from "react"

import { fetchLearningResources } from "../api/appApi"
import SearchBar from "../components/library/SearchBar"
import CategorySection from "../components/library/CategorySection"
import { colors, layout, radii, shadow, spacing, typography } from "../theme"

export default function LibraryScreen({ navigation }) {
  const [resources, setResources] = useState([])   // ✅ default array
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")

  useEffect(() => {
    fetchLearningResources()
      .then((data) => {
        setResources(Array.isArray(data) ? data : [])
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} color={colors.olive} />
  }

  const filterByCategory = (category) =>
    resources.filter(
      (r) =>
        r.category === category &&
        r.title?.toLowerCase().includes(query.toLowerCase())
    )

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Library</Text>
        <Text style={styles.subtitle}>Puna mātauranga</Text>
      </View>

      <SearchBar value={query} onChange={setQuery} />

      <Pressable
        onPress={() => navigation.navigate("Conditions")}
        style={({ pressed }) => [styles.linkCard, pressed && { opacity: 0.85 }]}
        accessibilityRole="button"
        accessibilityLabel="Open the conditions library"
      >
        <Text style={styles.linkTitle}>Conditions</Text>
        <Text style={styles.linkReo}>Ngā mate</Text>
        <Text style={styles.linkBody}>
          Plain-language information about heart conditions, what can trigger
          them, and how they are managed.
        </Text>
      </Pressable>

      <CategorySection
        title="Learn"
        items={filterByCategory("learn")}
      />

      <CategorySection
        title="Practice"
        items={filterByCategory("practice")}
      />

      <CategorySection
        title="Support"
        items={filterByCategory("support")}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.cornsilk,
  },
  content: {
    padding: layout.screenPadding,
    gap: spacing.md,
    paddingBottom: 40,
  },
  header: {
    gap: spacing.xs,
  },
  title: {
    ...typography.display,
    color: colors.olive,
  },
  subtitle: {
    ...typography.caption,
    color: colors.muted,
  },
  linkCard: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.xs,
    ...shadow.card,
  },
  linkTitle: {
    ...typography.title,
    color: colors.text,
  },
  linkReo: {
    ...typography.caption,
    color: colors.muted,
  },
  linkBody: {
    ...typography.body,
    color: colors.muted,
    marginTop: spacing.xs,
  },
})
