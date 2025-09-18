import { View } from "react-native"
import Text from "../components/ui/Text"
import Card from "../components/ui/Card"
import Spacer from "../components/ui/Spacer"

export default function LibraryScreen() {
  return (
    <View style={{ flex:1, padding:16 }}>
      <Text variant="heading">Library</Text>
      <Spacer size={12} />
      <Card><Text>Conditions (placeholder)</Text></Card>
      <Spacer />
      <Card><Text>Symptoms (placeholder)</Text></Card>
      <Spacer />
      <Card><Text>Medicines (placeholder)</Text></Card>
    </View>
  )
}
