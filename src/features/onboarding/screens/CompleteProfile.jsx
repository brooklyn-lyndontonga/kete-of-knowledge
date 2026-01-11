import React, { useState } from "react"
import { View, Button, ActivityIndicator } from "react-native"
import { useOnboarding } from "../../../app/providers/OnboardingProvider"

export default function CompleteProfile() {
  const { completeOnboarding, loading } = useOnboarding()

  const [profileData] = useState({
    name: "",
    dob: "",
  })

  async function handleFinish() {
    await completeOnboarding(profileData)
  }

  if (loading) return <ActivityIndicator />

  return (
    <View style={{ padding: 16 }}>
      {/* your inputs */}
      <Button title="Finish setup" onPress={handleFinish} />
    </View>
  )
}
