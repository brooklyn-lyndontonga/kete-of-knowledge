/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { View, Text } from "react-native"

export default function QuickView({ label, value }) {
  return (
    <View>
      <Text>{label}</Text>
      <Text style={{ fontSize: 24 }}>{value}</Text>
    </View>
  )
}
