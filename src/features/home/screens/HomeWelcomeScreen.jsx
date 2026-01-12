import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useOnboarding } from "../../../app/providers/OnboardingProvider"

export default function HomeWelcomeScreen() {
  const navigation = useNavigation()
  const { markHomeWelcomeSeen } = useOnboarding()

  const handleContinue = async () => {
    await markHomeWelcomeSeen()
    navigation.replace("HomeMain")
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "600", marginBottom: 12 }}>
        Nau mai ki tō kete
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 32 }}>
        This space is here to support you on your health and wellbeing journey.
      </Text>

      <TouchableOpacity onPress={handleContinue}>
        <Text style={{ fontSize: 18 }}>Open my kete →</Text>
      </TouchableOpacity>
    </View>
  )
}
