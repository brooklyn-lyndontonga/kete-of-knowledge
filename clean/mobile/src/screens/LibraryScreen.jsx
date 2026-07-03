import { ScrollView, Text, ActivityIndicator, StyleSheet, View, Pressable } from "react-native"
import { useEffect, useState, useCallback } from "react"

import { fetchLearningResources } from "../api/appApi"
import SearchBar from "../components/library/SearchBar"
import CategorySection from "../components/library/CategorySection"
import { colors, layout, spacing, typography } from "../theme"

// The server returns one row per (resource, category) pair, so a resource
// assigned to both "learn" and "practice" arrives twice, and a resource
// with no category arrives with category: null. This groups rows back into
// unique resources, each with a categories array.
function groupResources(rows) {
  const byId = new Map()

  for (const row of rows) {
    if (!byId.has(row.id)) {
      byId.set(row.id, { ...row, categories: [] })
    }
    if (row.category) {
      byId.get(row.id).categories.push(row.category)
    }
  }

  return Array.from(byId.values())
}

export default function LibraryScreen() {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [query, setQuery] = useState("")

  const load = useCallback(() => {
    setLoading(true)
    setError(false)

    fetchLearningResources()
      .then((data) => {
        setResources(groupResources(Array.isArray(data) ? data : []))
      })
      .catch((err) => {
        console.error("Failed to load library:", err)
        setError(true)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} color={colors.olive} />
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>{"Couldn't load the library"}</Text>
        <Text style={styles.errorBody}>
          Check your connection and try again.
        </Text>
        <Pressable
          onPress={load}
          accessibilityRole="button"
          accessibilityLabel="Retry loading the library"
          style={styles.retryButton}
        >
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    )
  }

  const matchesQuery = (r) =>
    r.title?.toLowerCase().includes(query.toLowerCase())

  const filterByCategory = (category) =>
    resources.filter((r) => r.categories.includes(category) && matchesQuery(r))

  // Published resources the admin forgot to categorise still deserve a home
  const uncategorised = resources.filter(
    (r) => r.categories.length === 0 && matchesQuery(r)
  )

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title} accessibilityRole="header">Library</Text>
        <Text style={styles.subtitle}>Puna mātauranga</Text>
      </View>

      <SearchBar value={query} onChange={setQuery} />

      <CategorySection title="Learn" items={filterByCategory("learn")} />
      <CategorySection title="Practice" items={filterByCategory("practice")} />
      <CategorySection title="Support" items={filterByCategory("support")} />
      <CategorySection title="More Resources" items={uncategorised} />
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
    paddingBottom: layout?.tabBarOffset ?? 40,
  },
  header: {
    gap: spacing.xs,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  subtitle: {
    ...typography.caption,
    color: colors.muted,
  },
  errorContainer: {
    flex: 1,
    padding: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
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
})
