/* eslint-disable unused-imports/no-unused-imports */
import React, { useLayoutEffect, useCallback } from "react"
import { View, Text, Button, TouchableOpacity } from "react-native"

export default function PostSignInWelcome({ navigation }) {
  const handleBack = useCallback(() => {
    if (navigation.canGoBack?.()) navigation.goBack()
    else navigation.navigate("AppTabs") // fallback if this is the stack root
  }, [navigation])

  // Put a Back button in the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,                 // make sure header is visible
      title: "Welcome",                  // this will also be the iOS back label on next screens
      headerBackTitleVisible: true,
      headerLeft: () => (
        <TouchableOpacity onPress={handleBack} style={{ paddingHorizontal: 12, paddingVertical: 8 }}>
          <Text style={{ fontSize: 16 }}>‹ Back</Text>
        </TouchableOpacity>
      ),
    })
  }, [navigation, handleBack])

  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center", padding:20 }}>
      <Text style={{ fontSize:20, fontWeight:"700", marginBottom:20 }}>Kia ora! Welcome 🎉</Text>
      <Text style={{ textAlign:"center", marginBottom:20 }}>
        Thanks for signing in. Let’s set up your profile so the app can be personalised for you.
      </Text>
      <Button title="Continue" onPress={() => navigation.navigate("CompleteProfile")} />
    </View>
  )
}
