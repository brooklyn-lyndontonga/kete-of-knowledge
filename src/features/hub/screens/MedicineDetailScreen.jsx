import React, { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"
import { useRoute, useNavigation } from "@react-navigation/native"
import { useTheme } from "../../../theme"

export default function MedicineDetailScreen() {
  const route = useRoute()
  const navigation = useNavigation()
  const { med } = route.params || {}

  const { colors, spacing, radii, typography } = useTheme()

  // Demo state (dose + frequency)
  const [selectedDose, setSelectedDose] = useState("Standard")
  const [selectedFreq, setSelectedFreq] = useState("Once daily")

  const styles = createStyles(colors, spacing, radii, typography)

  // Demo info sets
  const demoInfo = {
    Metformin: {
      use: "Used to help control blood sugar levels for people with type 2 diabetes.",
      sideEffects: ["Nausea", "Diarrhoea", "Low B12", "Stomach upset"],
      doses: ["500mg", "850mg", "1000mg"],
      frequencies: ["Once daily", "Twice daily"],
    },
    Levothyroxine: {
      use: "Used to treat an underactive thyroid (hypothyroidism).",
      sideEffects: ["Headache", "Nervousness", "Insomnia"],
      doses: ["25mcg", "50mcg", "75mcg", "100mcg"],
      frequencies: ["Once daily (morning)"],
    },
    Ibuprofen: {
      use: "Pain relief and anti-inflammatory.",
      sideEffects: ["Stomach pain", "Heartburn", "Nausea"],
      doses: ["200mg", "400mg"],
      frequencies: ["Every 6 hours", "As needed"],
    },
    // fallback
    Default: {
      use: "General information about this medicine.",
      sideEffects: ["None listed"],
      doses: ["Standard"],
      frequencies: ["Once daily"],
    },
  }

  const data = demoInfo[med?.name] || demoInfo.Default

  // Fake button handler
  const handleAddMedicine = () => {
    Alert.alert("Added!", `${med.name} has been added to your medicines.`)
    navigation.goBack()
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Animated.View entering={FadeInUp.duration(600).springify()}>
        <Text style={styles.name}>{med?.name}</Text>
        <Text style={styles.type}>{med?.type || "Medicine"}</Text>
      </Animated.View>

      {/* What it's used for */}
      <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.section}>
        <Text style={styles.sectionTitle}>What is this used for?</Text>
        <Text style={styles.sectionText}>{data.use}</Text>
      </Animated.View>

      {/* Dosage */}
      <Animated.View entering={FadeInUp.delay(300).duration(600)} style={styles.section}>
        <Text style={styles.sectionTitle}>Choose your dose</Text>

        <View style={styles.rowWrap}>
          {data.doses.map((dose) => (
            <TouchableOpacity
              key={dose}
              style={[
                styles.option,
                selectedDose === dose && styles.optionActive,
              ]}
              onPress={() => setSelectedDose(dose)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedDose === dose && styles.optionTextActive,
                ]}
              >
                {dose}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* Frequency */}
      <Animated.View entering={FadeInUp.delay(400).duration(600)} style={styles.section}>
        <Text style={styles.sectionTitle}>Frequency</Text>

        <View style={styles.rowWrap}>
          {data.frequencies.map((freq) => (
            <TouchableOpacity
              key={freq}
              style={[
                styles.option,
                selectedFreq === freq && styles.optionActive,
              ]}
              onPress={() => setSelectedFreq(freq)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedFreq === freq && styles.optionTextActive,
                ]}
              >
                {freq}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>

      {/* Side effects */}
      <Animated.View entering={FadeInUp.delay(500).duration(600)} style={styles.section}>
        <Text style={styles.sectionTitle}>Common side effects</Text>
        {data.sideEffects.map((effect) => (
          <Text key={effect} style={styles.bullet}>• {effect}</Text>
        ))}
      </Animated.View>

      {/* Warning Box */}
      <Animated.View entering={FadeInUp.delay(600).duration(600)} style={styles.warningBox}>
        <Text style={styles.warningTitle}>⚠️ Important</Text>
        <Text style={styles.warningText}>
          This information is for general guidance only.  
          It is not medical advice. Always consult your healthcare provider.
        </Text>
      </Animated.View>

      {/* Add Medicine Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleAddMedicine}>
        <Text style={styles.saveText}>Add to My Medicines</Text>
      </TouchableOpacity>

      <View style={{ height: spacing.xl * 2 }} />
    </ScrollView>
  )
}

function createStyles(colors, spacing, radii, typography) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
      padding: spacing.lg,
      paddingTop: 60,
    },
    name: {
      fontFamily: typography.heading,
      fontSize: 28,
      color: colors.primary,
    },
    type: {
      fontFamily: typography.body,
      fontSize: 14,
      color: colors.textLight,
      marginTop: 4,
      marginBottom: spacing.lg,
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
    sectionText: {
      fontFamily: typography.body,
      fontSize: 14,
      color: colors.text,
    },

    rowWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    option: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      backgroundColor: "#fff",
      borderRadius: radii.md,
      marginRight: spacing.sm,
      marginBottom: spacing.sm,
    },
    optionActive: {
      backgroundColor: colors.primary,
    },
    optionText: {
      fontFamily: typography.body,
      fontSize: 14,
      color: colors.text,
    },
    optionTextActive: {
      color: "white",
      fontFamily: typography.medium,
    },

    bullet: {
      fontFamily: typography.body,
      fontSize: 14,
      marginBottom: 4,
      color: colors.text,
    },

    warningBox: {
      backgroundColor: colors.accent2,
      padding: spacing.md,
      borderRadius: radii.lg,
      marginBottom: spacing.lg,
    },
    warningTitle: {
      fontFamily: typography.medium,
      fontSize: 16,
      color: "#fff",
      marginBottom: 4,
    },
    warningText: {
      fontFamily: typography.body,
      fontSize: 13,
      color: "#fff",
      opacity: 0.9,
    },

    saveButton: {
      backgroundColor: colors.primary,
      paddingVertical: spacing.md,
      borderRadius: radii.lg,
      alignItems: "center",
    },
    saveText: {
      color: "white",
      fontFamily: typography.medium,
      fontSize: 16,
    },
  })
}
