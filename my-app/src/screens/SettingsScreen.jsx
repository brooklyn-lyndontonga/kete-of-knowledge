import { View } from "react-native"
import Text from "../components/ui/Text"
import Spacer from "../components/ui/Spacer"
import Card from "../components/ui/Card"

export default function SettingsScreen() {
  return (
    <View style={{ flex:1, padding:16 }}>
      <Text variant="heading">Settings</Text>
      <Spacer />
      <Card><Text>App settings (placeholder)</Text></Card>
    </View>
  )
}
