/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native"
import { useEffect, useState } from "react"
import { useIsFocused } from "@react-navigation/native"

import { getMedicines } from "../../features/medicines.db.js"
import { colors, radii, shadow, spacing, typography } from "../../theme"
import { useAuth } from "../../auth/AuthContext"
import { useAuthGuard } from "../../auth/useAuthGuard"

export default function MyMedicinesScreen({ navigation }) {
  const [items, setItems] = useState([])
  const isFocused = useIsFocused()
  const { isGuest } = useAuth()
  const guard = useAuthGuard()

  useEffect(() => {
    if (isFocused) {
      getMedicines().then(setItems)
    }
  }, [isFocused])

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>My Medicines</Text>
        <Text style={styles.subtitle}>Āku rongoā</Text>
      </View>
      <Pressable
        onPress={() => guard(() => navigation.navigate("AddMedicine"))}
        style={({ pressed }) => [
          styles.primaryButton,
          (isGuest || pressed) && styles.primaryButtonDisabled,
        ]}
      >
        <Text style={styles.primaryText}>Add Medicine</Text>
      </Pressable>

      {items.length === 0 ? (
        <Text style={styles.empty}>No medicines added yet</Text>
      ) : (
        items.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
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
  primaryButtonDisabled: {
    opacity: 0.6,
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
