/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { View, StyleSheet } from "react-native";
import { colors, spacing, radius } from "../../theme";

function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export { default }  from "./Card"

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
