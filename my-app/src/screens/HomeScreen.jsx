/* eslint-disable unused-imports/no-unused-imports */
// /* eslint-disable unused-imports/no-unused-imports */
// import { StyleSheet } from "react-native";
// import { Text, View } from "react-native";


// export default function HomeScreen() {
//   return (
//     <View style={styles.container}>
//       <Text>Home screen is working ✅</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: "center", justifyContent: "center" },
// });


import Placeholder from "../components/Placeholder"

function HomeScreen() {
  return (
    <Placeholder
      title="Kete of Knowledge"
      body="Start here — quick links and updates. (Sprint-1 shell)"
    />
  )
}

export default HomeScreen