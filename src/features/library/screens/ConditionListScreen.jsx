import React, { useState } from "react"
import { View, Text, FlatList, TouchableOpacity } from "react-native"
import { useTheme } from "../../../theme"
import conditions from "../../../data/conditions.json"

export default function ConditionListScreen({ navigation }) {
  const { colors, spacing, typography } = useTheme()
  const [query, setQuery] = useState("")

  // ✅ simple keyword filter (will connect to SearchBar later)
  const filtered = conditions.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: spacing.lg }}>
      <Text
        style={{
          fontFamily: typography.display,
          fontSize: 22,
          color: colors.text,
          marginBottom: spacing.md
        }}
      >
        Health Conditions
      </Text>

      {/* Placeholder search bar — will be replaced by component later */}
      <View
        style={{
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: spacing.sm,
          marginBottom: spacing.md,
          padding: spacing.sm
        }}
      >
        <Text style={{ color: colors.mutedText }}>
          (Search coming soon)
        </Text>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ConditionDetail", { condition: item })
            }
            style={{
              backgroundColor: colors.card,
              padding: spacing.md,
              borderRadius: spacing.md,
              marginBottom: spacing.sm
            }}
          >
            <Text
              style={{
                fontFamily: typography.heading,
                fontSize: 18,
                color: colors.primary
              }}
            >
              {item.name}
            </Text>
            <Text
              style={{
                fontFamily: typography.body,
                color: colors.mutedText,
                marginTop: 4
              }}
              numberOfLines={2}
            >
              {item.description}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
