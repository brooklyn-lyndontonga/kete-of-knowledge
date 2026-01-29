/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { ScrollView } from "react-native"
import HubSection from "../components/hub/HubSection"

export default function HubScreen({ navigation }) {
  const sections = [
    "My Symptoms",
    "My Rongoā",
    "Checklists",
    "Reminders",
    "Notes",
  ]

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
      {sections.map((s) => (
        <HubSection
          key={s}
          title={s}
          onPress={() => navigation.navigate(s)}
        />
      ))}
    </ScrollView>
  )
}
