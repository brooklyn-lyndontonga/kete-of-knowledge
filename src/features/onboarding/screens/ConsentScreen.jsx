import React, { useState, useEffect } from "react"
import { View, Text, Button, Switch, Alert, ScrollView } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function ConsentScreen({ navigation }) {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    // restore if already ticked locally
    AsyncStorage.getItem("consent:temp").then(json => {
      if (json) setChecked(true)
    })
  }, [])

  const onAgree = async () => {
    if (!checked) return Alert.alert("Kia ora", "Please agree to continue.")
    const payload = { consentAcceptedAt: new Date().toISOString() }
    await AsyncStorage.setItem("consent:temp", JSON.stringify(payload))
    navigation.navigate("CompleteProfile") // next step
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 12 }}>
        Terms & Privacy / Ngā Tikanga me te Tūmataitinga
      </Text>

      <Text style={{ marginBottom: 16 }}>
        Plain-language statement here (bilingual). The app will store your profile
        and activity. You may delete your data anytime.
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
        <Switch value={checked} onValueChange={setChecked} />
        <Text style={{ marginLeft: 8 }}>I agree / Kei te whakaae au</Text>
      </View>

      <Button title="Continue" onPress={onAgree} disabled={!checked} />
    </ScrollView>
  )
}
