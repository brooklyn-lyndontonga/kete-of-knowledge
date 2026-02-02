/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react"
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from "react-native"
import { fetchWhakatauki } from "../../api/appApi.js"
import { colors, radii, shadow, spacing, typography } from "../../theme"

export default function WhakataukiScreen() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetchWhakatauki().then(setData)
  }, [])

  if (!data) {
    return <ActivityIndicator style={{ marginTop: 40 }} color={colors.olive} />
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {data.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.title}>{item.text}</Text>

          {item.translation && (
            <Text style={styles.translation}>{item.translation}</Text>
          )}
        </View>
      ))}
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
    paddingBottom: 40,
  },
  card: {
    padding: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    ...shadow.card,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  translation: {
    ...typography.body,
    color: colors.muted,
    marginTop: spacing.xs,
  },
})
