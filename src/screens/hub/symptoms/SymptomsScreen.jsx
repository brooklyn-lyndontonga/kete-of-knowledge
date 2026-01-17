/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, FlatList, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useAppData } from "../../../app/providers/AppDataProvider"


export default function SymptomsListScreen({ navigation }) {
  console.log("🩺 SymptomsListScreen rendered")

  const { symptoms } = useAppData()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 16 }}>
          My symptoms
        </Text>

        {(!symptoms || symptoms.length === 0) && (
          <Text style={{ color: "#666" }}>
            No symptoms logged yet 🌱
          </Text>
        )}

        <FlatList
          data={symptoms}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 12,
                borderRadius: 10,
                backgroundColor: "#F5F5F5",
                marginBottom: 12,
              }}
            >
              <Text style={{ fontWeight: "600" }}>
                {item.name || "Symptom"}
              </Text>

              <Text style={{ color: "#555", marginTop: 4 }}>
                Severity: {item.severity}
              </Text>

              <Text style={{ color: "#777", marginTop: 2 }}>
                {item.date}
              </Text>
            </View>
          )}
        />

        <Pressable
          onPress={() => navigation.navigate("LogSymptom")}
          style={{
            marginTop: 24,
            padding: 14,
            borderRadius: 12,
            backgroundColor: "#000",
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>
            + Log a symptom
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}
