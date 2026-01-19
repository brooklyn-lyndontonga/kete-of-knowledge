/* eslint-disable react/react-in-jsx-scope */
import { View, Text } from "react-native"

export default function ProfileMeta() {
  return (
    <View
      style={{
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#F5F5F5",
      }}
    >
      <Text style={{ fontWeight: "600", marginBottom: 8 }}>
        Data & ownership
      </Text>

      <Text style={{ fontSize: 12, color: "#666" }}>
        This kete belongs to you. Your information is stored
        securely and used only to support your wellbeing.
      </Text>
    </View>
  )
}
