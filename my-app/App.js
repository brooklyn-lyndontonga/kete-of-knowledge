import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold } from "@expo-google-fonts/playfair-display"
import { Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from "@expo-google-fonts/poppins"
import { Quicksand_500Medium } from "@expo-google-fonts/quicksand"
import { View, ActivityIndicator } from "react-native"
import RootNavigator from "./src/navigation/RootNavigator"

export default function App() {
  const [loaded] = useFonts({
    PlayfairDisplay_700Bold,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Quicksand_500Medium
  })

  if (!loaded) return <View style={{flex:1,justifyContent:"center"}}><ActivityIndicator/></View>

  return <RootNavigator />
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
