/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { View, Text } from "react-native"

export default function WhakataukiBanner({ text, translation }) {
  return (
    <View style={{ padding: 16, backgroundColor: "#F5F5F5", borderRadius: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: "600" }}>{text}</Text>
      {translation && (
        <Text style={{ marginTop: 8, color: "#666" }}>{translation}</Text>
      )}
    </View>
  )
}
