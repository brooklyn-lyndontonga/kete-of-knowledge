/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { ScrollView, View, Text, Button } from "react-native"
import { useEffect, useState } from "react"
import { useIsFocused } from "@react-navigation/native"

import { getMedicines } from "../../features/medicines.db.js"

export default function MyMedicinesScreen({ navigation }) {
  const [items, setItems] = useState([])
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      getMedicines().then(setItems)
    }
  }, [isFocused])

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Button
        title="Add Medicine"
        onPress={() => navigation.navigate("AddMedicine")}
      />

      {items.length === 0 ? (
        <Text>No medicines added yet</Text>
      ) : (
        items.map((item) => (
          <View
            key={item.id}
            style={{
              padding: 12,
              backgroundColor: "#f3f3f3",
              borderRadius: 8,
            }}
          >
            <Text style={{ fontWeight: "600" }}>{item.name}</Text>
            {item.notes ? <Text>{item.notes}</Text> : null}
          </View>
        ))
      )}
    </ScrollView>
  )
}
