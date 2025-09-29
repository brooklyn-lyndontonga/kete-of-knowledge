import React, { useState, useEffect } from "react"
import { View, Text, Button, Switch, Alert, ScrollView } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

const TEMP_CONSENT_KEY = "consent:temp"

export default function ConsentScreen({ navigation }) {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem(TEMP_CONSENT_KEY).then(v => { if (v) setChecked(true) })
  }, [])

  const onAgree = async () => {
    if (!checked) return Alert.alert("Kia ora", "Please agree to continue.")
    await AsyncStorage.setItem(TEMP_CONSENT_KEY, JSON.stringify({ consentAcceptedAt: new Date().toISOString() }))
    navigation.navigate("CompleteProfile")
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 12 }}>
        Terms & Privacy / Ngā Tikanga me te Tūmataitinga
      </Text>
      <Text style={{ marginBottom: 16 }}>
        Plain-language statement (bilingual). You must agree to proceed.
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
        <Switch value={checked} onValueChange={setChecked} />
        <Text style={{ marginLeft: 8 }}>I agree / Kei te whakaae au</Text>
      </View>

      <Button title="Continue" onPress={onAgree} disabled={!checked} />
    </ScrollView>
  )
}
