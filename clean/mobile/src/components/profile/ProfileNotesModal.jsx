/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import { Modal, View, Text, TextInput, Button } from "react-native"
import { useState, useEffect } from "react"

export default function ProfileNotesModal({
  visible,
  onClose,
  onSave,
  initialValue = "",
}) {
  const [text, setText] = useState("")

  useEffect(() => {
    setText(initialValue)
  }, [initialValue, visible])

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.4)",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 16,
            padding: 16,
            gap: 12,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            Profile Notes
          </Text>

          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Write something about yourself, your health, or anything important…"
            multiline
            style={{
              minHeight: 120,
              borderWidth: 1,
              borderColor: "#ddd",
              borderRadius: 10,
              padding: 12,
              textAlignVertical: "top",
            }}
          />

          <View style={{ flexDirection: "row", gap: 12 }}>
            <Button title="Cancel" onPress={onClose} />
            <Button
              title="Save"
              onPress={() => {
                onSave(text)
                onClose()
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}
