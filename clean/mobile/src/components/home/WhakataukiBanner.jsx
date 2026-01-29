/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { View, Text } from "react-native"

export default function WhakataukiBanner({ text, translation }) {
  return (
    <View style={{ padding: 16, backgroundColor: "#EEE", borderRadius: 10 }}>
      <Text style={{ fontSize: 18 }}>{text}</Text>
      <Text>{translation}</Text>
    </View>
  )
}
