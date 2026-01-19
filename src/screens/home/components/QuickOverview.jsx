/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { View } from "react-native"
import QuickStatCard from "./QuickStatCard"

export default function QuickOverview({ navigation, summary }) {
  if (!summary) return null

  return (
    <View style={{ gap: 16 }}>
      <QuickStatCard
        title="Checklist"
        value={`${summary.checklist?.todayCount || 0} tasks today`}
        onPress={() =>
          navigation.navigate("Hub", { screen: "Checklist" })
        }
      />

      <QuickStatCard
        title="Medicines"
        value={`${summary.medicines?.activeCount || 0} active`}
        onPress={() =>
          navigation.navigate("Hub", { screen: "MedicinesList" })
        }
      />

      <QuickStatCard
        title="Symptoms"
        value={
          summary.symptoms?.latest?.symptom || "No recent symptoms"
        }
        subtitle={
          summary.symptoms?.latest
            ? `Severity ${summary.symptoms.latest.severity}`
            : null
        }
        onPress={() =>
          navigation.navigate("Hub", { screen: "SymptomsList" })
        }
      />

      <QuickStatCard
        title="Notes"
        value={summary.notes?.latest?.title || "No notes yet"}
        subtitle={summary.notes?.latest?.date}
        onPress={() =>
          navigation.navigate("Hub", { screen: "NotesList" })
        }
      />
   </View>
  )
}
