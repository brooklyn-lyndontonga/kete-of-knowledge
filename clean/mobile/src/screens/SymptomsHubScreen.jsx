/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { View, Text, Pressable } from "react-native"

export default function SymptomsHubScreen({ navigation }) {
  return (
    <View style={{ padding: 16, gap: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "600" }}>
        Symptoms
      </Text>

      <Pressable
        onPress={() => navigation.navigate("AddSymptom")}
        style={{ padding: 16, backgroundColor: "#EEE", borderRadius: 10 }}
      >
        <Text>Log a symptom</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("Library")}
        style={{ padding: 16, backgroundColor: "#EEE", borderRadius: 10 }}
      >
        <Text>Learn about symptoms</Text>
      </Pressable>
    </View>
  )
}
