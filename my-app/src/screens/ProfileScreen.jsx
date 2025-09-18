import { View } from "react-native"
import Text from "../components/ui/Text"
import Button from "../components/ui/Button"
import Spacer from "../components/ui/Spacer"

export default function ProfilesScreen() {
  return (
    <View style={{ flex:1, padding:16 }}>
      <Text variant="heading">Profiles</Text>
      <Spacer size={12} />
      <Button title="Add Profile (placeholder)" onPress={() => {}} />
    </View>
  )
}
