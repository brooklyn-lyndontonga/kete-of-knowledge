// src/ui/components/BackButton.jsx
import React from "react"
import { TouchableOpacity, Text } from "react-native"
import { useNavigation, useNavigationState } from "@react-navigation/native"

export default function BackButton({ label = "Back" }) {
  const navigation = useNavigation()
  const canGoBack = useNavigationState(state => state?.routes?.length > 1)

  const onPress = () => {
    if (canGoBack) navigation.goBack()
    else navigation.navigate("AppTabs") // fallback (root)
  }

  return (
    <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 8, paddingVertical: 4 }}>
      <Text style={{ fontSize: 16 }}>{label}</Text>
    </TouchableOpacity>
  )
}
