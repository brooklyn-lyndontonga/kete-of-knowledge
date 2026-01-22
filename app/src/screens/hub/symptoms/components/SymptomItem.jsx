/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { View, Text, Pressable } from "react-native"

export default function SymptomItem({ item, onEdit, onDelete }) {
  return (
    <Pressable
      onPress={onEdit}
      onLongPress={onDelete}
      style={{ paddingVertical: 12, borderBottomWidth: 1, borderColor: "#eee" }}
    >
      <Text style={{ fontWeight: "600" }}>{item.symptom}</Text>
      <Text>Severity: {item.severity}</Text>
      <Text style={{ fontSize: 12 }}>{item.date}</Text>
    </Pressable>
  )
}
