/* eslint-disable unused-imports/no-unused-imports */
import { View, Text, TextInput, Button } from "react-native"
import { useState } from "react"

function CompleteProfile({ navigation }) {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Complete Your Profile</Text>
      
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={{ borderWidth: 1, marginTop: 10, padding: 8 }} />
      <TextInput placeholder="Age" value={age} onChangeText={setAge} style={{ borderWidth: 1, marginTop: 10, padding: 8 }} keyboardType="numeric" />

      <Button title="Finish" onPress={() => navigation.navigate("Done")} />
    </View>
  )
}

export default CompleteProfile