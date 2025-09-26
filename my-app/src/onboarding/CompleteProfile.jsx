/* eslint-disable unused-imports/no-unused-imports */
import React, { useState } from "react"
import { View, Text, TextInput, Button } from "react-native"

function CompleteProfile({ navigation }) {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")

  return (
    <View style={{ flex:1, padding:20 }}>
      <Text style={{ fontSize:18, fontWeight:"700", marginBottom:12 }}>
        Complete Your Profile
      </Text>
      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth:1, marginBottom:10, padding:8 }}
      />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={{ borderWidth:1, marginBottom:10, padding:8 }}
      />
      <TextInput
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
        style={{ borderWidth:1, marginBottom:10, padding:8 }}
      />
      <Button title="Next" onPress={() => navigation.navigate("Consent")} />
    </View>
  )
}

export default CompleteProfile