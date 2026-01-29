/* eslint-disable react/react-in-jsx-scope */
import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect } from "react"
import AppTabs from "./src/stacks/AppTabs"
import { initDB } from "./src/db"

export default function App() {
  useEffect(() => {
    initDB()
  }, [])

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <AppTabs />
      </SafeAreaView>
    </NavigationContainer>
  )
}
