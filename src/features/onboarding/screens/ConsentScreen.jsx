import React, { useState } from "react"
import { View, Text, Switch, Button, Alert } from "react-native"

export default function ConsentScreen({ navigation }) {
  const [checked, setChecked] = useState(false)

  const onContinue = () => {
    if (!checked) return Alert.alert("Kia tūpato", "Please agree to continue.")
    navigation.navigate("CompleteProfile")
  }

  return (
    <View style={{ flex:1, padding:20, justifyContent:"center" }}>
      <Text style={{ fontSize:22, fontWeight:"700", marginBottom:12 }}>
        Privacy & Consent
      </Text>

      <Text style={{ marginBottom:16 }}>
        Bilingual, plain-language privacy statement goes here…
      </Text>

      <View style={{ flexDirection:"row", alignItems:"center", marginBottom:20 }}>
        <Switch value={checked} onValueChange={setChecked} />
        <Text style={{ marginLeft:10 }}>I agree / Kei te whakaae au</Text>
      </View>

      <Button title="Continue" onPress={onContinue} disabled={!checked} />
    </View>
  )
}
