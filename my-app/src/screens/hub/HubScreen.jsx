/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
import { View, Text, StyleSheet } from "react-native"

function HubScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>❤️ Taku Manawa</Text>
      <Text style={{ marginTop: 10, textAlign: "center" }}>
        This is the Hub.  
        Think of it as the heart of the app where all the main features live.  
        From here, you’ll access the main app features
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  list: {
    fontSize: 15,
    textAlign: "left",
    alignSelf: "flex-start",
    marginVertical: 2,
  },
})

export default HubScreen