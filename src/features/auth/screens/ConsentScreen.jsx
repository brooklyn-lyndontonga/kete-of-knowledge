import React, { useState } from "react"
import { View, Text, Button, Switch, StyleSheet } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"

export default function ConsentScreen() {
  const [checked, setChecked] = useState(false)
  const navigation = useNavigation()

  const handleContinue = async () => {
    await AsyncStorage.setItem("consentAccepted", "true")
    navigation.navigate("EmailSignIn")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        By continuing you agree to share data for research and support purposes.
        {"\n"}
        Mā te whakaae ka taea e koe te tuku raraunga mō te rangahau me te tautoko.
      </Text>

      <View style={styles.row}>
        <Switch value={checked} onValueChange={setChecked} />
        <Text>I agree / Ka whakaae au</Text>
      </View>

      <Button title="Continue" onPress={handleContinue} disabled={!checked} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  text: { marginBottom: 20, fontSize: 16 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
})
