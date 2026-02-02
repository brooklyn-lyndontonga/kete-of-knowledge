/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native"
import { useEffect, useState } from "react"
import { useIsFocused } from "@react-navigation/native"

import { getSymptoms } from "../../features/symptoms.db.js"
import { colors, radii, shadow, spacing, typography } from "../../theme"

export default function MySymptomsScreen({ navigation }) {
  const [items, setItems] = useState([])
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      getSymptoms().then(setItems)
    }
  }, [isFocused])

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>My Symptoms</Text>
        <Text style={styles.subtitle}>Āku tohu</Text>
      </View>
      <Pressable
        onPress={() => navigation.navigate("AddSymptom")}
        style={styles.primaryButton}
      >
        <Text style={styles.primaryText}>Add Symptom</Text>
      </Pressable>

      {items.length === 0 ? (
        <Text style={styles.empty}>No symptoms logged yet</Text>
      ) : (
        items.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.symptom}</Text>
            {item.notes ? (
              <Text style={styles.cardBody}>{item.notes}</Text>
            ) : null}
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
  cardBody: {
    ...typography.body,
    color: colors.text,
    marginTop: 6,
  },
})
