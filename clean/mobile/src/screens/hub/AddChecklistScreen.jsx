/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { View, TextInput, Button, Text } from "react-native"
import { useState } from "react"

export default function AddChecklistScreen({ navigation }) {
  const [title, setTitle] = useState("")
  const [item, setItem] = useState("")
  const [items, setItems] = useState([])

  function addItem() {
    if (!item) return
    setItems([...items, { label: item, done: false }])
    setItem("")
  }

  function save() {
    if (!title) return
    // later → SQLite insert
    navigation.goBack()
  }

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <TextInput placeholder="Checklist title" value={title} onChangeText={setTitle} />

      <View style={{ flexDirection: "row", gap: 8 }}>
        <TextInput
          placeholder="Add item"
          value={item}
          onChangeText={setItem}
          style={{ flex: 1 }}
        />
        <Button title="Add" onPress={addItem} />
      </View>

      {items.map((i, idx) => (
        <Text key={idx}>• {i.label}</Text>
      ))}

      <Button title="Save Checklist" onPress={save} />
    </View>
  )
}
