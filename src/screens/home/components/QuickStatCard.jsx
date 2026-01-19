/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Pressable, View, Text } from "react-native"

export default function QuickStatCard({ title, value, subtitle, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#F5F5F5",
      }}
    >
      <Text style={{ fontWeight: "600" }}>{title}</Text>
      <Text style={{ marginTop: 4 }}>{value}</Text>
      {subtitle && (
        <Text style={{ marginTop: 2, fontSize: 12, color: "#666" }}>
          {subtitle}
        </Text>
      )}
    </Pressable>
  )
}
