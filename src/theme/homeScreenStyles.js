import { StyleSheet } from "react-native"

export const createHomeScreenStyles = (colors, spacing, radii, typography) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
      padding: spacing.lg,
    },
    header: {
      marginBottom: spacing.xl,
    },
    greeting: {
      fontFamily: typography.heading,
      fontSize: 26,
      color: colors.text,
      marginBottom: spacing.md,
    },
    quickActions: {
      marginBottom: spacing.xl,
    },
    sectionTitle: {
      fontFamily: typography.medium,
      fontSize: 18,
      color: colors.text,
      marginBottom: spacing.md,
    },
    cardRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: spacing.md,
    },
    cardWrapper: {
      backgroundColor: colors.card,
      borderRadius: radii.lg,
      padding: spacing.md,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 4,
    },
    footer: {
      marginTop: spacing.xl,
      borderTopWidth: 1,
      borderColor: colors.border,
      paddingTop: spacing.md,
      flexDirection: "row",
      justifyContent: "space-around",
    },
    footerLink: {
      color: colors.primary,
      fontFamily: typography.medium,
      fontSize: 16,
    },
  })
