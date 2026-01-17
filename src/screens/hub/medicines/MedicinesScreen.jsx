import React, { useState } from "react"
import { View, Text, TextInput, FlatList, Pressable } from "react-native"
import { useAppData } from "../../../app/providers/AppDataProvider"


export default function MedicinesScreen() {
  const { medicines, addMedicine, deleteMedicine } = useAppData()
  const [name, setName] = useState("")

  return (
    <View style={{ padding: 16 }}>
      <TextInput placeholder="Medicine" value={name} onChangeText={setName} />
      <Pressable
        onPress={() => {
          addMedicine({ id: Date.now(), name })
          setName("")
        }}
      >
        <Text>＋ Add</Text>
      </Pressable>

      <FlatList
        data={medicines}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Pressable onPress={() => deleteMedicine(item.id)}>
              <Text style={{ color: "red" }}>Delete</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  )
}
