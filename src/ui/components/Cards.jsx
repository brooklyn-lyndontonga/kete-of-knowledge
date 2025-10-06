/* eslint-disable unused-imports/no-unused-imports */
import { View, StyleSheet } from "react-native";
import { colors, spacing, radii } from "../../theme";

function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export { default }  from "./Card"

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
