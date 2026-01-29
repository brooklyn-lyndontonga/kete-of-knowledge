/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { View, Text, TextInput } from "react-native"

export default function ProfileNotes({ value, onChange }) {
  return (
    <View>
      <Text>Notes</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        multiline
        style={{ backgroundColor: "#EEE", padding: 12, borderRadius: 10 }}
      />
    </View>
  )
}
