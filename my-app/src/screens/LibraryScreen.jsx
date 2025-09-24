/* eslint-disable unused-imports/no-unused-imports */
import Placeholder from "../components/Placeholder"
import { useNavigation } from "@react-navigation/native"
import Button from "../components/ui/Button"
import Spacer from "../components/ui/Spacer"

function LibraryScreen() {
  const nav = useNavigation()
  
  return (
    <>
    <Placeholder title="Library" body="Hub for health info (stub)" />
    <Spacer />
    <Button title="Library Guide" onPress={() => nav.navigate("LibraryGuide")} />
  </>
  )
}

export default LibraryScreen