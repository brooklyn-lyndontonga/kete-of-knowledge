/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { View, Text, Pressable } from "react-native"

export default function ProfileFocusPreview({ focus, onEdit }) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontWeight: "600" }}>Current focus</Text>

      <Text>{focus || "No focus set"}</Text>

      <Pressable onPress={onEdit}>
        <Text style={{ color: "#007AFF", marginTop: 4 }}>
          Edit focus
        </Text>
      </Pressable>
    </View>
  )
}
