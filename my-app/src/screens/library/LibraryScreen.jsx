/* eslint-disable unused-imports/no-unused-imports */
import { View, Text } from "react-native"

function LibraryScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>📚 Library</Text>
      <Text style={{ marginTop: 10, textAlign: "center" }}>
        This is the Library screen.  
        Eventually this will display resources, tools, or saved items depending on the build plan.  
        For now, it’s just a placeholder to help you continue development.
      </Text>
    </View>
  )
}

export default LibraryScreen