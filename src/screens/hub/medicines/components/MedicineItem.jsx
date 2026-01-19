/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Text, Pressable } from "react-native"

export default function MedicineItem({ item, onEdit, onDelete, onToggle }) {
  return (
    <Pressable
      onPress={onEdit}
      onLongPress={onDelete}
      style={{ paddingVertical: 12 }}
    >
      <Text>{item.name}</Text>
      <Text onPress={onToggle}>
        {item.active ? "Active" : "Inactive"}
      </Text>
    </Pressable>
  )
}
