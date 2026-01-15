/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, FlatList, Pressable } from "react-native"
import conditions from "../../data/conditions.json"

export default function LibraryScreen({ navigation }) {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 16 }}>
        Library
      </Text>

      <FlatList
        data={conditions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("Condition", { id: item.id })
            }
            style={{ paddingVertical: 12 }}
          >
            <Text style={{ fontWeight: "500" }}>
              {item.name}
            </Text>
            <Text style={{ color: "#666" }}>
              {item.summary}
            </Text>
          </Pressable>
        )}
      />
    </View>
  )
}
