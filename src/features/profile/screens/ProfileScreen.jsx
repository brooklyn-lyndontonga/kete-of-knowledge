/* eslint-disable unused-imports/no-unused-imports */
import { View, Text, StyleSheet } from "react-native"

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Profiles</Text>
      <Text style={styles.paragraph}>
        This is the Profiles screen.{"\n"}
        Later, users will be able to:
      </Text>

      <Text style={styles.list}>• Create and update their personal profile</Text>
      <Text style={styles.list}>• Add key details like name, age, and preferences</Text>
      <Text style={styles.list}>• Manage multiple profiles (if enabled)</Text>

      <Text style={styles.paragraph}>
        For now, this is just a placeholder so you can continue building and
        testing navigation. 🚀
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

export default ProfileScreen