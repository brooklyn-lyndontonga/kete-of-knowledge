/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Slider,
} from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"
import { useTheme } from "../../../theme"

export default function SymptomTrackerScreen({ route }) {
  const { colors, spacing, radii, typography } = useTheme()

  // If user clicked from SymptomsScreen, we have a specific symptom
  const selectedSymptom = route?.params?.symptom || null

  const [severity, setSeverity] = useState(5)
  const [mood, setMood] = useState(null)

  // Demo log entries
  const [logs, setLogs] = useState([
    { id: 1, severity: 4, mood: "🙂", date: "Yesterday" },
    { id: 2, severity: 6, mood: "😕", date: "2 days ago" },
    { id: 3, severity: 3, mood: "😊", date: "3 days ago" },
  ])

  // Weekly chart demo data
  const weekly = [4, 6, 3, 5, 7, 4, 5]

  const styles = createStyles(colors, spacing, radii, typography)

  const title = selectedSymptom
    ? `${selectedSymptom.emoji} ${selectedSymptom.name}`
    : "Symptom Tracker"

  const subtitle = selectedSymptom
    ? selectedSymptom.maori
    : "Record your daily symptoms"

  // Save log (demo only)
  const saveLog = () => {
    if (!mood) return

    const newLog = {
      id: logs.length + 1,
      severity,
      mood,
      date: "Today",
    }

    setLogs([newLog, ...logs])
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Animated.View entering={FadeInUp.duration(500).springify()}>
        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.subheading}>{subtitle}</Text>
      </Animated.View>

      {/* Severity Slider */}
      <Animated.View entering={FadeInUp.delay(150).duration(500)} style={styles.section}>
        <Text style={styles.sectionTitle}>Severity (0–10)</Text>
        <View style={styles.sliderWrapper}>
          <Slider
            minimumValue={0}
            maximumValue={10}
            step={1}
            value={severity}
            onValueChange={setSeverity}
            minimumTrackTintColor={colors.primary}
          />
          <Text style={styles.severityValue}>{severity}</Text>
        </View>
      </Animated.View>

      {/* Mood Selector */}
      <Animated.View entering={FadeInUp.delay(300).duration(500)} style={styles.section}>
        <Text style={styles.sectionTitle}>How are you feeling?</Text>
        <View style={styles.moodRow}>
          {["😊", "🙂", "😕", "😣"].map((m) => (
            <TouchableOpacity
              key={m}
              onPress={() => setMood(m)}
              style={[
                styles.moodButton,
                mood === m && styles.moodSelected,
              ]}
            >
              <Text style={styles.moodText}>{m}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={saveLog}>
        <Text style={styles.saveButtonText}>Save Entry (demo)</Text>
      </TouchableOpacity>

      {/* Weekly Chart */}
      <Animated.View entering={FadeInUp.delay(450).duration(500)} style={styles.section}>
        <Text style={styles.sectionTitle}>This Week</Text>
        <View style={styles.chartRow}>
          {weekly.map((val, i) => (
            <View key={i} style={styles.chartBarWrapper}>
              <View
                style={[
                  styles.chartBar,
                  { height: Math.min(val * 12, 120) },
                ]}
              />
              <Text style={styles.chartLabel}>D{i + 1}</Text>
            </View>
          ))}
        </View>
      </Animated.View>

      {/* Log History */}
      <Text style={styles.sectionTitle}>Recent Entries</Text>

      {logs.map((log) => (
        <View key={log.id} style={styles.logCard}>
          <Text style={styles.logText}>
            {log.date} — Severity {log.severity}/10 {log.mood}
          </Text>
        </View>
      ))}

      <View style={{ height: spacing.xl * 3 }} />
    </ScrollView>
  )
}

function createStyles(colors, spacing, radii, typography) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
      paddingHorizontal: spacing.lg,
      paddingTop: 60,
    },
    heading: {
      fontFamily: typography.heading,
      fontSize: 26,
      color: colors.primary,
    },
    subheading: {
      fontFamily: typography.body,
      color: colors.textLight,
      marginBottom: spacing.xl,
      marginTop: 4,
    },

    section: {
      marginBottom: spacing.xl,
    },
    sectionTitle: {
      fontFamily: typography.medium,
      fontSize: 18,
      marginBottom: spacing.sm,
      color: colors.text,
    },

    // Slider
    sliderWrapper: {
      flexDirection: "row",
      alignItems: "center",
    },
    severityValue: {
      fontFamily: typography.medium,
      fontSize: 18,
      marginLeft: 10,
      color: colors.primary,
    },

    // Mood buttons
    moodRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: spacing.sm,
    },
    moodButton: {
      padding: 12,
      backgroundColor: "#fff",
      borderRadius: radii.lg,
      borderWidth: 1,
      borderColor: colors.border,
      width: "22%",
      alignItems: "center",
    },
    moodSelected: {
      borderColor: colors.primary,
      backgroundColor: colors.accent2,
    },
    moodText: {
      fontSize: 24,
    },

    // Save button
    saveButton: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.md,
      borderRadius: radii.lg,
      alignItems: "center",
      marginBottom: spacing.xl,
    },
    saveButtonText: {
      color: "#fff",
      fontFamily: typography.medium,
      fontSize: 16,
    },

    // Chart
    chartRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    chartBarWrapper: {
      alignItems: "center",
      flex: 1,
    },
    chartBar: {
      width: 20,
      backgroundColor: colors.primary,
      borderRadius: 10,
      marginBottom: 6,
    },
    chartLabel: {
      fontSize: 10,
      color: colors.textLight,
    },

    // Logs
    logCard: {
      backgroundColor: "#fff",
      padding: spacing.md,
      borderRadius: radii.lg,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    logText: {
      fontFamily: typography.body,
      fontSize: 14,
      color: colors.text,
    },
  })
}
