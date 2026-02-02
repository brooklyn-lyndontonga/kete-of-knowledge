/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { ScrollView, Text, View, Pressable, StyleSheet } from "react-native"
import { useState } from "react"
import { colors, radii, shadow, spacing, typography } from "../../theme"

export default function ChecklistsScreen({ navigation }) {
  const [checklists, setChecklists] = useState([])

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Checklists</Text>
        <Text style={styles.subtitle}>Rārangi arowhai</Text>
      </View>
      <Pressable
        onPress={() => navigation.navigate("AddChecklist")}
        style={styles.primaryButton}
      >
        <Text style={styles.primaryText}>Create Checklist</Text>
      </Pressable>

      {checklists.length === 0 ? (
        <Text style={styles.empty}>No checklists yet</Text>
      ) : (
        checklists.map((list, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{list.title}</Text>
            <Text style={styles.cardMeta}>{list.items.length} items</Text>
          </View>
        ))
      )}
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
  primaryButton: {
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.olive,
    alignItems: "center",
  },
  primaryText: {
    ...typography.bodyStrong,
    color: colors.cornsilk,
  },
  empty: {
    ...typography.body,
    color: colors.muted,
  },
  card: {
    padding: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
  cardTitle: {
    ...typography.bodyStrong,
    color: colors.text,
  },
  cardMeta: {
    ...typography.caption,
    color: colors.muted,
  },
})
