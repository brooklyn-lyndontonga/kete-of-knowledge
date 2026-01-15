/* eslint-disable react/react-in-jsx-scope */
import { View, Text } from "react-native"
import { useLatestSymptom } from "../../../hooks/useLatestSymptom"

export default function QuickStats() {
  console.log("📊 QuickStats rendered")
  
  const { latestSymptom, loading } = useLatestSymptom()

  if (loading) {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ opacity: 0.5 }}>Loading your day…</Text>
      </View>
    )
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontWeight: "600", marginBottom: 8 }}>
        Latest check-in
      </Text>

      {latestSymptom ? (
        <View>
          <Text>{latestSymptom.symptom}</Text>
          <Text style={{ opacity: 0.6 }}>
            Severity: {latestSymptom.severity}
          </Text>
        </View>
      ) : (
        <Text style={{ opacity: 0.5 }}>
          You haven’t logged anything yet.
        </Text>
      )}
    </View>
  )
}
