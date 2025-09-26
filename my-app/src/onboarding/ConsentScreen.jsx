/* eslint-disable no-undef */
/* eslint-disable unused-imports/no-unused-imports */
import { useOnboarding } from "../context/OnboardingContext"
import { markConsentLocal, upsertConsentIfNeeded } from "../auth/consent"
import { View, Text, Button, Switch, Alert } from "react-native"

function ConsentScreen({ navigation }) {
  const { consentAccepted, setConsentAccepted } = useOnboarding()

  async function handleContinue() {
    try {
      // TODO: replace this with supabase.auth.getUser() once sign-in works
      const userId = "anon"

      if (consentAccepted) {
        await markConsentLocal(userId)
        navigation.navigate("EmailSignIn")
      }
    } catch (e) {
      console.error("Consent save failed", e)
      Alert.alert("Error", "Something went wrong saving your consent")
    }
  }

  return (
    <View style={{ flex: 1, padding: 20, gap: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "700" }}>Terms & Conditions|Privacy & Consent</Text>
      <Text>
       We’ll store your data locally and only sync with your permission. 
        You can delete your data any time.
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Switch
          value={consentAccepted}
          onValueChange={setConsentAccepted}
        />
        <Text>I agree</Text>
      </View>

      <Button
        title="Continue"
        onPress={handleContinue}
        disabled={!consentAccepted}
      />
    </View>
  )
}

export default ConsentScreen
