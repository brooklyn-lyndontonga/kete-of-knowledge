import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"

import { useWhakatauki } from "../../hooks/useWhakatauki"
import { useSymptoms } from "../../hooks/useSymptoms"
import { useInsights } from "../../hooks/useInsights"
import { useReflectionPrompts } from "../../hooks/useReflectionPrompts"

import WhakataukiCard from "../../../components/WhakataukiCard"
import InsightCard from "../../insights/InsightCard"
import ReflectionPromptCard from "../../reflections/ReflectionPromptCard"

export default function HomeScreen() {
  const navigation = useNavigation()

  const { whakatauki, loading } = useWhakatauki()
  const { symptoms } = useSymptoms()
  const insights = useInsights(symptoms)
  const reflectionPrompts = useReflectionPrompts(insights)

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Whakataukī */}
      {!loading && whakatauki && (
        <WhakataukiCard whakatauki={whakatauki} />
      )}

      {/* Insights */}
      {insights.length > 0 && (
        <>
          <Text style={{ marginTop: 24, fontSize: 18 }}>
            Noticing patterns
          </Text>

          {insights.map((insight, idx) => (
            <InsightCard
              key={idx}
              message={insight.message}
            />
          ))}
        </>
      )}

      {/* Reflection prompts */}
      {reflectionPrompts.length > 0 && (
        <>
          <Text style={{ marginTop: 24, fontSize: 18 }}>
            A moment to reflect
          </Text>

          {reflectionPrompts.map((p) => (
            <ReflectionPromptCard
              key={p.id}
              prompt={p.prompt}
              onPress={() =>
                navigation.navigate("WriteReflection", {
                  prompt: p.prompt,
                })
              }
            />
          ))}
        </>
      )}

      {/* Actions */}
      <Text style={{ marginTop: 24, fontSize: 18 }}>
        What would you like to do today?
      </Text>

      <TouchableOpacity
        style={{ marginTop: 16 }}
        onPress={() => navigation.navigate("Hub")}
      >
        <Text>Track a symptom</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 12 }}
        onPress={() => navigation.navigate("Library")}
      >
        <Text>Learn & understand</Text>
      </TouchableOpacity>
    </View>
  )
}
