/* eslint-disable unused-imports/no-unused-imports */
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home screen is working ✅</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
