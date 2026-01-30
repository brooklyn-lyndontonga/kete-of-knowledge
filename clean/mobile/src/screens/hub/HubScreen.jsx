/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */

import { ScrollView, View, Text, Pressable } from "react-native"

export default function HubScreen({ navigation }) {
  const sections = [
    { label: "My Symptoms", route: "MySymptoms" },
    { label: "My Medicines", route: "MyMedicines" },
    { label: "Reminders", route: "Reminders" },
    { label: "Checklists", route: "Checklists" },
    { label: "Notes", route: "Notes" },
  ]

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
      {sections.map((item) => (
        <Pressable
          key={item.route}
          onPress={() => navigation.navigate(item.route)}
          style={{
            padding: 14,
            borderRadius: 8,
            backgroundColor: "#ddd",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            {item.label}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  )
}
