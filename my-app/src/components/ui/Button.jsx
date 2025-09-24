/* eslint-disable unused-imports/no-unused-imports */
import { Pressable, Text, StyleSheet } from "react-native";

function Button({ title, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 8,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});
