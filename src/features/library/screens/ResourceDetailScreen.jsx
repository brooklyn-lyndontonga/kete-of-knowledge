import React from "react"
import { View, Text, Image } from "react-native"
import { useRoute } from "@react-navigation/native"

export default function ResourceDetailScreen() {
  const { params } = useRoute()
  const { resource } = params

  return (
    <View style={{ padding: 16 }}>
      {resource.image && (
        <Image
          source={{ uri: resource.image }}
          style={{ height: 200, borderRadius: 12, marginBottom: 16 }}
        />
      )}

      <Text style={{ fontSize: 20, fontWeight: "700" }}>
        {resource.title}
      </Text>

      <Text style={{ marginTop: 8 }}>
        {resource.summary}
      </Text>
    </View>
  )
}
