/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { View, Text } from "react-native"

export default function ResourceCard({ item }) {
  return (
    <View style={{ padding: 12, borderBottomWidth: 1 }}>
      <Text style={{ fontWeight: "600" }}>{item.title}</Text>
      <Text>{item.description}</Text>
    </View>
  )
}
