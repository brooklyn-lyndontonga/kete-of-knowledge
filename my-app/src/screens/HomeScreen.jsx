import { View } from "react-native"
import Text from "../components/ui/Text"
import Card from "../components/ui/Card"
import Spacer from "../components/ui/Spacer"

export default function HomeScreen() {
  return (
    <View style={{ flex:1, padding:16 }}>
      <Text variant="heading">Kete of Knowledge</Text>
      <Spacer size={16} />
      <Card><Text>Welcome — start here.</Text></Card>
    </View>
  )
}
