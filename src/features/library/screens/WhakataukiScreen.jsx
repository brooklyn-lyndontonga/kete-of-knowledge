 
import React, { useState, useMemo } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"
import { useTheme } from "../../../theme"
import whakataukiData from "../../../data/whakatauki.json"

export default function WhakataukiScreen() {
  const { colors, spacing, radii, typography } = useTheme()
  const styles = createStyles(colors, spacing, radii, typography)

  const [search, setSearch] = useState("")
  const [randomKey, setRandomKey] = useState(Math.random())

  // Filtered by search
  const filtered = useMemo(() => {
    return whakataukiData.filter((item) =>
      item.text.toLowerCase().includes(search.toLowerCase()) ||
      item.translation.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  // Random “shuffle” feature
  function shuffle() {
    setRandomKey(Math.random()) // triggers re-render
  }

  const displayedList = search.trim() === "" ? [...whakataukiData] : filtered

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Animated.View entering={FadeInUp.duration(500).springify()}>
        <Text style={styles.heading}>Ngā Whakataukī</Text>
        <Text style={styles.subheading}>
          Words of wisdom — mātauranga that guides and uplifts.
        </Text>
      </Animated.View>

      {/* Search */}
      <TextInput
        style={styles.search}
        placeholder="Search whakataukī..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
      />

      {/* Shuffle Button */}
      <TouchableOpacity onPress={shuffle} style={styles.shuffleButton}>
        <Text style={styles.shuffleText}>🔀 Shuffle</Text>
      </TouchableOpacity>

      {/* Whakataukī Cards */}
      {displayedList
        .sort(() => 0.5 - Math.random() * randomKey) // random if shuffle pressed
        .map((item, index) => (
          <Animated.View
            key={index}
            entering={FadeInUp.delay(150 + index * 80)}
            style={styles.card}
          >
            <Text style={styles.whakatauki}>{item.text}</Text>
            <Text style={styles.translation}>{item.translation}</Text>
          </Animated.View>
        ))}

      <View style={{ height: spacing.xl * 2 }} />
    </ScrollView>
  )
}

function createStyles(colors, spacing, radii, typography) {
  return StyleSheet.create({
    container: {
      padding: spacing.lg,
      paddingTop: 60,
      backgroundColor: colors.bg,
    },

    heading: {
      fontFamily: typography.heading,
      fontSize: 28,
      color: colors.primary,
    },
    subheading: {
      fontFamily: typography.body,
      fontSize: 14,
      opacity: 0.8,
      marginBottom: spacing.lg,
    },

    search: {
      backgroundColor: "#fff",
      padding: spacing.md,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: spacing.md,
      fontFamily: typography.body,
    },

    shuffleButton: {
      backgroundColor: colors.accent2,
      padding: spacing.md,
      borderRadius: radii.lg,
      alignItems: "center",
      marginBottom: spacing.lg,
    },
    shuffleText: {
      color: "#fff",
      fontFamily: typography.medium,
      fontSize: 16,
    },

    card: {
      backgroundColor: colors.accent1,
      padding: spacing.lg,
      borderRadius: radii.lg,
      marginBottom: spacing.lg,
    },

    whakatauki: {
      fontFamily: typography.medium,
      fontSize: 18,
      color: "#fff",
      marginBottom: spacing.sm,
    },
    translation: {
      fontFamily: typography.body,
      fontSize: 14,
      color: "#fff",
      opacity: 0.85,
      fontStyle: "italic",
    },
  })
}
