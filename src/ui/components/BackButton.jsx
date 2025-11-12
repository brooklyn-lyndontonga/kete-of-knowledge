/* eslint-disable react/prop-types */
import React from "react"
import { TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

export default function BackButton({ color = "#267f53" }) {
  const navigation = useNavigation()
  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
      <Ionicons name="chevron-back" size={24} color={color} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: { padding: 8 },
})
