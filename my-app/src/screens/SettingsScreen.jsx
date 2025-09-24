/* eslint-disable unused-imports/no-unused-imports */
import Placeholder from "../components/Placeholder"
import { useNavigation } from "@react-navigation/native"
import Button from "../components/ui/Button"
import Spacer from "../components/ui/Spacer"

function SettingsScreen() {
  const nav = useNavigation()
  return (
    <>
    <Placeholder title="Settings" body="App settings (stub)" />
    <Spacer />
    <Button title="Help" onPress={() => nav.navigate("Help")} />
    <Spacer />
    <Button title="Privacy" onPress={() => nav.navigate("Privacy")} />
  </>
  )
}

export default SettingsScreen
