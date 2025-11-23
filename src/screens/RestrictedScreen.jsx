/* eslint-disable react/prop-types */
import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"

export default function RestrictedScreen({ route }) {
  const navigation = useNavigation()
  const cta = route?.params?.cta || "Sign in to continue"

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restricted Area</Text>
      <Text style={styles.text}>
        This part of the app is for signed-in users only.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Welcome")}
      >
        <Text style={styles.buttonText}>{cta}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#267f53",
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "#444",
  },
  button: {
    backgroundColor: "#267f53",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
})
