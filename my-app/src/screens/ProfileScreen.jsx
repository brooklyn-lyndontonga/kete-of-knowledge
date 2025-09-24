/* eslint-disable unused-imports/no-unused-imports */
import { useNavigation } from "@react-navigation/native"
import Button from "../components/ui/Button"
import Spacer from "../components/ui/Spacer"

function ProfilesScreen() {
  const nav = useNavigation()
  return (
    <View style={{ flex:1, padding:16 }}>
      <Text title="Profiles" body="Whānau profile hub (stub)"></Text>/Text&gt;
      <Spacer size={12} />
      <Button title="Profile Guidelines" onPress={() => nav.navigate("ProfileGuidelines")} />
    </View>
  )
}

export default ProfilesScreen