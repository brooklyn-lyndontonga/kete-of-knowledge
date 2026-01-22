/* eslint-disable no-unused-vars */
import React from "react"
import { StyleSheet } from "react-native"
import { spacing, radius } from "../../theme"

export const navigation = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    paddingVertical: spacing.sm,
    paddingBottom: spacing.md,

    backgroundColor: "rgba(255, 255, 255, 0.88)", // translucent
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.06)",

    // optional: slight rounding if nav is floating
    // borderTopLeftRadius: radius.lg,
    // borderTopRightRadius: radius.lg,
  },

  item: {
    fontSize: 12,
    color: "#6b7280",
  },

  active: {
    color: "#267f53",
    fontWeight: "600",
  },
})
