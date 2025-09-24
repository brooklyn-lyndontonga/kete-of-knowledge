/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable unused-imports/no-unused-imports */
import Placeholder from "../components/Placeholder"
import { useNavigation } from "@react-navigation/native"
import Button from "../components/ui/Button"
import Spacer from "../components/ui/Spacer"

function HomeScreen() {
  return (
    <Placeholder
      title="Kete of Knowledge"
      body="Start here — quick links and updates. (Sprint-1 shell)"
    />
  )
}
const nav = useNavigation()(
  <>
    <Placeholder title="Kete of Knowledge" body="Start here — Sprint-1 shell" />
    <Spacer />
    <Button title="Getting Started" onPress={() => nav.navigate("GettingStarted")} />
  </>
)

export default HomeScreen