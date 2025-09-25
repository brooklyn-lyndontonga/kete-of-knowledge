/* eslint-disable no-undef */
/* eslint-disable unused-imports/no-unused-imports */
import { useOnboarding } from "../context/OnboardingContext"
import { markConsentLocal } from "./consentUtils"
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
      <Text style={{ fontSize: 18, fontWeight: "700" }}>Privacy & Consent</Text>
      <Text>
        EN: We’ll store your data locally and only sync with your permission. 
        You can delete your data any time.
      </Text>
      <Text>
        MI: Ka tiaki mātou i ō raraunga ki te pūrere, ā, māu e whakaae ai 
        ki te tuku ki te ipurangi. Ka āhei koe ki te muku i ngā raraunga i ngā wā katoa.
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Switch
          value={consentAccepted}
          onValueChange={setConsentAccepted}
        />
        <Text>I agree / Kei te whakaae au</Text>
      </View>

      <Button
        title="Continue / Haere tonu"
        onPress={handleContinue}
        disabled={!consentAccepted}
      />
    </View>
  )
}

export default ConsentScreen
