/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Text, Pressable } from "react-native"

export default function ChecklistItem({ item, onEdit, onDelete, onToggle }) {
  return (
    <Pressable
      onPress={onToggle}
      onLongPress={onDelete}
      style={{ paddingVertical: 12 }}
    >
      <Text
        style={{
          textDecorationLine: item.completed ? "line-through" : "none",
        }}
      >
        {item.title}
      </Text>
      <Text onPress={onEdit}>Edit</Text>
    </Pressable>
  )
}
