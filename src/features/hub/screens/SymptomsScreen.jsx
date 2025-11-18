/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native"
import Animated, { FadeInUp } from "react-native-reanimated"
import { useNavigation } from "@react-navigation/native"
import { useTheme } from "../../../theme"

export default function SymptomsScreen() {
  const navigation = useNavigation()
  const { colors, spacing, radii, typography } = useTheme()

  // Demo data for Sprint 5
  const [symptoms] = useState([
    { id: 1, name: "Fatigue", severity: 3, lastLogged: "Today" },
    { id: 2, name: "Mood", severity: 2, lastLogged: "Yesterday" },
    { id: 3, name: "Stress", severity: 4, lastLogged: "2 days ago" },
    { id: 4, name: "Pain", severity: 1, lastLogged: "Today" },
  ])

  const styles = createStyles(colors, spacing, radii, typography)

  return (
    <ScrollView style={styles.container}>
      <Animated.View entering={FadeInUp.duration(600).springify()}>
        <Text style={styles.heading}>Symptoms</Text>
        <Text style={styles.subheading}>Track how you feel each day</Text>
      </Animated.View>

      {symptoms.map((symptom, index) => (
        <Animated.View
          key={symptom.id}
          entering={FadeInUp.delay(index * 150).duration(500)}
        >
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("SymptomTracker", { symptom })
            }
          >
            <View style={styles.cardHeader}>
              <Text style={styles.symptomName}>{symptom.name}</Text>
              <SeverityDots level={symptom.severity} />
            </View>

            <Text style={styles.lastLogged}>Last logged: {symptom.lastLogged}</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}

      <View style={{ height: spacing.xl }} />
    </ScrollView>
  )
}

function SeverityDots({ level }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <View
          key={i}
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginLeft: 4,
            backgroundColor: i <= level ? "#e25f5f" : "#e5e5e5",
          }}
        />
      ))}
    </View>
  )
}
