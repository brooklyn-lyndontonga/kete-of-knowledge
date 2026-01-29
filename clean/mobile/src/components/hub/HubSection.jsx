/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { View, Text, Pressable } from "react-native"

export default function HubSection({ title, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 16,
        backgroundColor: "#F0F0F0",
        borderRadius: 12,
        marginBottom: 12,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "600" }}>
        {title}
      </Text>
    </Pressable>
  )
}
