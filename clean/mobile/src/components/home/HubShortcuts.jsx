/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { View, Text, Pressable } from "react-native"

export default function HubShortcuts({ onNavigate }) {
  const items = ["Symptoms", "Rongoā", "Notes", "Checklists"]

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
      {items.map((item) => (
        <Pressable
          key={item}
          onPress={() => onNavigate(item)}
          style={{ padding: 12, backgroundColor: "#DDD", borderRadius: 10 }}
        >
          <Text>{item}</Text>
        </Pressable>
      ))}
    </View>
  )
}
