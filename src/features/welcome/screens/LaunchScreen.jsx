/* eslint-disable no-unused-vars */
import React, { useEffect } from "react"
import { View, Text, StyleSheet, ActivityIndicator } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "../../../context/AuthContext" // your hook

export default function LaunchScreen() {
  const navigation = useNavigation()
  const { session, user } = useAuth()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (session?.user) {
        navigation.replace("WelcomeBack", {
          name: session.user.user_metadata?.name || "e hoa",
        })
      } else {
        navigation.replace("Welcome")
      }
    }, 1500)

    return () => clearTimeout(timer)
  }, [session, navigation])

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Kete o te Mātauranga</Text>
      <ActivityIndicator size="large" color="#267f53" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: 24,
    marginBottom: 20,
    color: "#267f53",
    fontWeight: "700",
  },
})
