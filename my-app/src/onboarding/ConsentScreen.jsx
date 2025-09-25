/* eslint-disable unused-imports/no-unused-imports */
import { useOnboarding } from "./OnboardingContext"
import { View, Text, Button, Switch } from "react-native"
export default function ConsentScreen({ navigation }) {
  const { consentAccepted, setConsentAccepted } = useOnboarding()
  return (
    <View style={{ flex:1, padding:20, gap:16 }}>
      <Text style={{ fontSize:18, fontWeight:"700" }}>Privacy & Consent</Text>
      <Text>
        EN: We’ll store your data locally and only sync with your permission. You can delete your data any time.
      </Text>
      <Text>
        MI: Ka tiaki mātou i ō raraunga ki te pūrere, ā, māu e whakaae ai ki te tuku ki te ipurangi. Ka āhei koe ki te muku i ngā raraunga i ngā wā katoa.
      </Text>
      <View style={{ flexDirection:"row", alignItems:"center", gap:10 }}>
        <Switch value={consentAccepted} onValueChange={setConsentAccepted} />
        <Text>I agree / Kei te whakaae au</Text>
      </View>
      <Button title="Continue / Haere tonu"
              onPress={() => navigation.navigate("EmailSignIn")}
              disabled={!consentAccepted}/>
    </View>
  )
}
