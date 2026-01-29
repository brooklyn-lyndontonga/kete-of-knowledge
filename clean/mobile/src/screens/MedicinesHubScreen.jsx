/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { View, Text, Pressable } from "react-native"

export default function MedicinesHubScreen({ navigation }) {
  return (
    <View style={{ padding: 16, gap: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "600" }}>
        Rongoā & Medicines
      </Text>

      <Pressable
        onPress={() => navigation.navigate("AddMedicine")}
        style={{
          padding: 16,
          backgroundColor: "#EEE",
          borderRadius: 10,
        }}
      >
        <Text>Log a medicine / rongoā</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("Library")}
        style={{
          padding: 16,
          backgroundColor: "#EEE",
          borderRadius: 10,
        }}
      >
        <Text>Learn about rongoā & medicines</Text>
      </Pressable>
    </View>
  )
}
