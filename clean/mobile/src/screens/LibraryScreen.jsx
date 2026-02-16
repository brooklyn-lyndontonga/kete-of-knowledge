 
import { ScrollView, Text, ActivityIndicator, StyleSheet, View } from "react-native"
import { useEffect, useState } from "react"

import { fetchLearningResources } from "../api/appApi"
import SearchBar from "../components/library/SearchBar"
import CategorySection from "../components/library/CategorySection"
import { colors, layout, spacing, typography } from "../theme"

export default function LibraryScreen() {
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
})
