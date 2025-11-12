/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

export default function Header({ title, showBack = true, color = "#267f53" }) {
  const navigation = useNavigation()

  return (
    <View style={[styles.container, { borderBottomColor: color + "30" }]}>
      {showBack ? (
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={color} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backPlaceholder} />
      )}

      <Text style={[styles.title, { color }]} numberOfLines={1}>
        {title}
      </Text>

      {/* Spacer to balance layout */}
      <View style={styles.backPlaceholder} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50, // enough space under status bar
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    backgroundColor: "#fff",
  },
  back: { padding: 8 },
  backPlaceholder: { width: 32 },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    textAlign: "center",
    flex: 1,
  },
})
