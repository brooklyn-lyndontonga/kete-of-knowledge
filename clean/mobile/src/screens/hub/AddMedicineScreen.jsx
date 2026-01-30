/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { View, TextInput, Button } from "react-native"
import { useState } from "react"
import { addMedicine } from "../../features/medicines.db.js"

export default function AddMedicineScreen({ navigation }) {
  const [name, setName] = useState("")
  const [notes, setNotes] = useState("")

  async function save() {
    if (!name) return

    await addMedicine({
      name,
      notes,
    })

    navigation.goBack()
  }

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <TextInput
        placeholder="Rongoā / Medicine name"
        value={name}
        onChangeText={setName}
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
