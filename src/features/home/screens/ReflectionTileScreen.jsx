/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { apiGet } from "../utils/api"

export default function ReflectionTile() {
  const [reflection, setReflection] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    apiGet("/reflections/latest")
      .then((data) => setReflection(data))
      .catch(() => setError("Unable to load reflection"))
  }, [])

  if (error) return <Text>{error}</Text>
  if (!reflection) return <Text>Loading reflection…</Text>

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{reflection.title}</Text>
      <Text style={styles.message}>{reflection.message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  message: {
    fontSize: 15,
    marginTop: 8,
    color: "#444",
    lineHeight: 22,
  },
})
