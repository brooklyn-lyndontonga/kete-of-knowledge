/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { ScrollView } from "react-native"
import { useState } from "react"

import SearchBar from "../components/library/SearchBar"
import CategorySection from "../components/library/CategorySection"

export default function LibraryScreen({ resources }) {
  const [query, setQuery] = useState("")

  const filter = (type) =>
    resources.filter(
      (r) =>
        r.category === type &&
        r.title.toLowerCase().includes(query.toLowerCase())
    )

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 16 }}>
      <SearchBar value={query} onChange={setQuery} />

      <CategorySection title="Learn" items={filter("learn")} />
      <CategorySection title="Practice" items={filter("practice")} />
      <CategorySection title="Support" items={filter("support")} />
    </ScrollView>
  )
}
