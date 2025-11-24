/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { View, Text, TextInput, Button, StyleSheet } from "react-native"

export default function CompleteProfile({ navigation }) {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Complete Your Profile</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button title="Finish" onPress={() => navigation.navigate("Done")} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 20, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 10,
    padding: 8,
    borderRadius: 8,
  },
})
