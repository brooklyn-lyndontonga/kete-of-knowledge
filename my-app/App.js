/* eslint-disable unused-imports/no-unused-imports */
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts, PlayfairDisplay_700Bold } from "@expo-google-fonts/playfair-display";
import { Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { Quicksand_500Medium } from "@expo-google-fonts/quicksand";
import RootNavigator from "./src/navigation/RootNavigator";

function App() {
  const [loaded] = useFonts({
    PlayfairDisplay_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Quicksand_500Medium,
  });

  if (!loaded) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator />
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <RootNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
});

export default App;