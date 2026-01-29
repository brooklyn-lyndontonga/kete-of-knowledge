/* eslint-disable react/react-in-jsx-scope */
import { ScrollView, Text, ActivityIndicator } from "react-native"
import { useEffect, useState } from "react"

import { fetchLearningResources } from "../api/appApi"
import SearchBar from "../components/library/SearchBar"
import CategorySection from "../components/library/CategorySection"

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
    return <ActivityIndicator style={{ marginTop: 40 }} />
  }

  const filterByCategory = (category) =>
    resources.filter(
      (r) =>
        r.category === category &&
        r.title?.toLowerCase().includes(query.toLowerCase())
    )

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 12 }}>Library</Text>

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
