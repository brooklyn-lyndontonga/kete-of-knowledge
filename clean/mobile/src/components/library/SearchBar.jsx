/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { TextInput } from "react-native"

export default function SearchBar({ value, onChange }) {
  return (
    <TextInput
      placeholder="Search resources"
      value={value}
      onChangeText={onChange}
      style={{ padding: 12, backgroundColor: "#EEE", borderRadius: 10 }}
    />
  )
}
