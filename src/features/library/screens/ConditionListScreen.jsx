import React, { useState } from "react"
import { View, Text, FlatList, TouchableOpacity } from "react-native"
import { useTheme } from "../../../theme"
import conditions from "../../../data/conditions.json"
import SearchBar from "../../../ui/components/SearchBar" // ✅ integrated search bar

export default function ConditionListScreen({ navigation }) {
  const { colors, spacing, typography } = useTheme()
  const [query, setQuery] = useState("")

  // ✅ keyword filter logic
  const filtered = conditions.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: spacing.lg }}>
      {/* 🏷️ Screen title */}
      <Text
        style={{
          fontFamily: typography.display,
          fontSize: 22,
          color: colors.text,
          marginBottom: spacing.md,
        }}
      >
        Health Conditions
      </Text>

      {/* 🔍 Search bar */}
      <SearchBar query={query} setQuery={setQuery} placeholder="Search conditions..." />

      {/* 🧩 Results */}
      {filtered.length === 0 ? (
        <Text
          style={{
            color: colors.mutedText,
            fontFamily: typography.body,
            marginTop: spacing.md,
          }}
        >
          No results found.
        </Text>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ConditionDetail", { condition: item })
              }
              style={{
                backgroundColor: colors.card,
                padding: spacing.md,
                borderRadius: spacing.md,
                marginBottom: spacing.sm,
              }}
            >
              <Text
                style={{
                  fontFamily: typography.heading,
                  fontSize: 18,
                  color: colors.primary,
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  fontFamily: typography.body,
                  color: colors.mutedText,
                  marginTop: 4,
                }}
                numberOfLines={2}
              >
                {item.description}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  )
}
