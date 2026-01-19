/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { View, Text, Pressable } from "react-native"

export default function NoteItem({ note, onEdit, onDelete }) {
  return (
    <Pressable
      onPress={onEdit}
      onLongPress={onDelete}
      style={{
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: "#eee",
      }}
    >
      <Text style={{ fontWeight: "600" }}>{note.title}</Text>
      {note.content && <Text>{note.content}</Text>}
    </Pressable>
  )
}
