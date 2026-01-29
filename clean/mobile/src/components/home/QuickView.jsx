/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { View, Text } from "react-native"

export default function QuickView({ label, value }) {
  return (
    <View style={{ padding: 12, backgroundColor: "#EEE", borderRadius: 10 }}>
      <Text style={{ fontSize: 12, color: "#555" }}>{label}</Text>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>{value}</Text>
    </View>
  )
}
