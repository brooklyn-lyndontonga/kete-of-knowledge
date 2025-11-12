import { StyleSheet } from "react-native"

export const createStyles = (styleFn) => (theme) =>
  StyleSheet.create(styleFn(theme))
