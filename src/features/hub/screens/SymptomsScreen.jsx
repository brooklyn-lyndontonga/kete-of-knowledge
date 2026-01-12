import React from "react"
import { View, Text, FlatList, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useSymptoms } from "../../hooks/useSymptoms"
import { useInsights } from "../../hooks/useInsights"
import InsightCard from "../../insights/InsightCard"

export default function SymptomsScreen() {
  const navigation = useNavigation()
  const { symptoms, loading } = useSymptoms()
  const insights = useInsights(symptoms)

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Gentle insights */}
      {insights.length > 0 && (
        <View style={{ marginBottom: 16 }}>
          {insights.map((i, idx) => (
            <InsightCard key={idx} message={i.message} />
          ))}
        </View>
      )}

      {/* Header */}
      <Text style={{ fontSize: 22, marginBottom: 16 }}>
        Symptom tracker
      </Text>

      {/* Add symptom */}
      <TouchableOpacity
        style={{ marginBottom: 16 }}
        onPress={() => navigation.navigate("SymptomTracker")}
      >
        <Text style={{ fontSize: 16 }}>+ Add symptom</Text>
      </TouchableOpacity>

      {/* Content */}
      {loading ? (
        <Text>Loading…</Text>
      ) : symptoms.length === 0 ? (
        <Text>No symptoms logged yet.</Text>
      ) : (
        <FlatList
          data={symptoms}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 12,
                borderBottomWidth: 1,
                borderColor: "#eee",
              }}
            >
              <Text style={{ fontSize: 16 }}>{item.symptom}</Text>
              <Text style={{ color: "#666" }}>
                Severity: {item.severity}/10
              </Text>
              {item.notes ? (
                <Text style={{ color: "#888" }}>{item.notes}</Text>
              ) : null}
            </View>
          )}
        />
      )}
    </View>
  )
}
