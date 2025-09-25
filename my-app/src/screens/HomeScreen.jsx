 
/* eslint-disable unused-imports/no-unused-imports */
import { View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Placeholder from "../components/Placeholder"
import Button from "../components/ui/Button"
import Spacer from "../components/ui/Spacer"


function HomeScreen() {
  const nav = useNavigation()

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Placeholder 
        title="Kete of Knowledge" 
        body="Start here — Sprint-1 shell" 
      />
      <Spacer />
      <Button 
        title="Getting Started" 
        onPress={() => nav.navigate("GettingStarted")} 
      />
    </View>
  )
}

export default HomeScreen
