/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react"
import { View, Text, ScrollView, ActivityIndicator } from "react-native"
import { fetchWhakatauki } from "../api/appApi.js"

export default function WhakataukiScreen() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetchWhakatauki().then(setData)
  }, [])

  if (!data) {
    return <ActivityIndicator style={{ marginTop: 40 }} />
  }

  return (
    <ScrollView style={{ padding: 16 }}>
      {data.map((item) => (
        <View key={item.id} style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            {item.text}
          </Text>

          {item.translation && (
            <Text style={{ opacity: 0.7 }}>
              {item.translation}
            </Text>
          )}
        </View>
      ))}
    </ScrollView>
  )
}
