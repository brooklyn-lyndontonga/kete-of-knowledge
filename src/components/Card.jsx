/* eslint-disable no-undef */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
export default function Card({ children, tone, row = false }) {
  const { colors, spacing } = useTheme()

  return (
    <View
      style={{
        backgroundColor: colors.card,
        padding: spacing.lg,
        borderRadius: spacing.md,
        marginBottom: spacing.md,
        flexDirection: row ? "row" : "column",
        alignItems: row ? "center" : "flex-start",
        justifyContent: row ? "space-between" : "flex-start",
      }}
    >
      {children}
    </View>
  )
}
