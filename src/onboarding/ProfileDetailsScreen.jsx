 
/* eslint-disable unused-imports/no-unused-imports */
import { useState } from "react"
import { View, Text, TextInput, Button, StyleSheet } from "react-native"
import { supabase } from "../auth/supabaseClient"

function ProfileDetailsScreen({ navigation }) {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")

  async function handleSave() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      name,
      age,
      gender,
    })

    if (error) {
      console.error("❌ Error saving profile:", error)
    } else {
      navigation.navigate("Done")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tell us about yourself</Text>

      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Gender" value={gender} onChangeText={setGender} style={styles.input} />

      <Button title="Continue" onPress={handleSave} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 12, borderRadius: 6 },
})

export default ProfileDetailsScreen
