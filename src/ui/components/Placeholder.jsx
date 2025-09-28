/* eslint-disable unused-imports/no-unused-imports */
import { View, Text, StyleSheet } from "react-native";
import Spacer from "./Spacer";
import Card from "./Card";

function Placeholder({ title, body = "Coming soon…" }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Spacer size={16} />
      <Card>
        <Text>{body}</Text>
      </Card>
    </View>
  );
}

export default Placeholder;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 8 },
});
