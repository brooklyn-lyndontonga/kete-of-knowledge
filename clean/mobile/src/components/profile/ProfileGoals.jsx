/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { View, Text } from "react-native"

export default function ProfileGoals({ goals }) {
  return (
    <View>
      <Text style={{ fontWeight: "600" }}>Goals</Text>
      {goals.map((g) => (
        <Text key={g.id}>• {g.title}</Text>
      ))}
    </View>
  )
}
