/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import {
  View,
  Text,
  TextInput,
  Button,
  Pressable,
} from "react-native"
import { useEffect, useState } from "react"
import { API_URL } from "../../lib/api"

export default function EditProfileGoals({ navigation }) {
  const [goals, setGoals] = useState([])
  const [title, setTitle] = useState("")

  useEffect(() => {
    loadGoals()
  }, [])

  async function loadGoals() {
    const res = await fetch(`${API_URL}/goals`)
    setGoals(await res.json())
  }

  async function addGoal() {
    if (!title) return

    await fetch(`${API_URL}/goals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    })

    setTitle("")
    loadGoals()
  }

  async function setActive(id) {
    await Promise.all(
      goals.map((g) =>
        fetch(`${API_URL}/goals/${g.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ active: g.id === id }),
        })
      )
    )

    loadGoals()
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>
        Edit goals
      </Text>

      <TextInput
        placeholder="New goal"
        value={title}
        onChangeText={setTitle}
      />

      <Button title="Add goal" onPress={addGoal} />

      {goals.map((g) => (
        <Pressable
          key={g.id}
          onPress={() => setActive(g.id)}
          style={{
            padding: 12,
            marginTop: 8,
            backgroundColor: g.active ? "#E6F0FF" : "#F5F5F5",
          }}
        >
          <Text>{g.title}</Text>
        </Pressable>
      ))}

      <Button title="Done" onPress={() => navigation.goBack()} />
    </View>
  )
}
