/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { View, TextInput, Button } from "react-native"
import { useState } from "react"

export default function AddMedicineScreen({ navigation }) {
  const [name, setName] = useState("")
  const [dosage, setDosage] = useState("")
  const [notes, setNotes] = useState("")

  async function save() {
    if (!name) return

    // SQLite wiring comes next – for now just go back
    navigation.goBack()
  }

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <TextInput
        placeholder="Medicine / Rongoā name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Dosage"
        value={dosage}
        onChangeText={setDosage}
      />
      <TextInput
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
      />
      <Button title="Save" onPress={save} />
    </View>
  )
}
