/* eslint-disable no-undef */
import React from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native"
import { useNavigation } from "@react-navigation/native"

export default function HubHomeScreen() {
  const navigation = useNavigation()

  const tools = [
    {
      title: "Goals",
      emoji: "🎯",
      screen: "Goals",
    },
    {
      title: "Symptoms",
      emoji: "📋",
      screen: "Symptoms",
    },
    {
      title: "Tracker",
      emoji: "📊",
      screen: "SymptomTracker",
    },
    {
      title: "My Medicines",
      emoji: "💊",
      screen: "MyMedicines",
    },
    {
      title: "Medicine List",
      emoji: "📦",
      screen: "MedicinesList",
    },
    {
      title: "Conditions",
      emoji: "📚",
      screen: "ConditionList",
    },
    {
      title: "Contacts",
      emoji: "☎️",
      screen: "Contacts",
    },
  ]

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Top Header */}
      <ImageBackground
        source={require("../../../../assets/splash-icon.png")}
        style={styles.header}
        imageStyle={{ opacity: 0.08 }}
      >
        <Text style={styles.title}>Tāku Manawa</Text>
        <Text style={styles.subtitle}>
          Your wellbeing + heart care hub.
        </Text>
      </ImageBackground>

      {/* Grid */}
      <View style={styles.grid}>
        {tools.map((tool, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate(tool.screen)}
          >
            <Text style={styles.emoji}>{tool.emoji}</Text>
            <Text style={styles.cardTitle}>{tool.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: 80 }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
    backgroundColor: "#F8F7F3",
  },

  /* HEADER */
  header: {
    paddingVertical: 40,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#267f53",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: "#444",
    opacity: 0.8,
  },

  /* GRID */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 26,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  emoji: {
    fontSize: 28,
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
  },
})
