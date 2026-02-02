/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { View, Text, Pressable, StyleSheet } from "react-native"
import { colors, radii, shadow, spacing, typography } from "../../theme"

export default function SymptomsHubScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Symptoms</Text>
        <Text style={styles.subtitle}>Tohumate</Text>
      </View>

      <Pressable
        onPress={() => navigation.navigate("AddSymptom")}
        style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}
      >
        <Text style={styles.cardText}>Log a symptom</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("Library")}
        style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}
      >
        <Text style={styles.cardText}>Learn about symptoms</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.md,
    backgroundColor: colors.cornsilk,
    flex: 1,
  },
  title: {
    ...typography.title,
    color: colors.text,
  },
  subtitle: {
    ...typography.caption,
    color: colors.muted,
  },
  card: {
    padding: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
  cardPressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.92,
  },
  cardText: {
    ...typography.bodyStrong,
    color: colors.text,
  },
})
