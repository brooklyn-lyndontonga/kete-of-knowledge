/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { ScrollView, View, Text, Button } from "react-native"
import { useEffect, useState } from "react"
import { useIsFocused } from "@react-navigation/native"

import { getSymptoms } from "../../features/symptoms.db.js"

export default function MySymptomsScreen({ navigation }) {
  const [items, setItems] = useState([])
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      getSymptoms().then(setItems)
    }
  }, [isFocused])

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Button title="Add Symptom" onPress={() => navigation.navigate("AddSymptom")} />

      {items.length === 0 ? (
        <Text>No symptoms logged yet</Text>
      ) : (
        items.map((item) => (
          <View
            key={item.id}
            style={{ padding: 12, backgroundColor: "#f3f3f3", borderRadius: 8 }}
          >
            <Text style={{ fontWeight: "600" }}>{item.symptom}</Text>
            {item.notes ? <Text>{item.notes}</Text> : null}
          </View>
        ))
      )}
    </ScrollView>
  )
}
