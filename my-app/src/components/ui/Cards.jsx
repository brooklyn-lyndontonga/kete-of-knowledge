import { colors, spacing, radii } from "../../theme"

export default function Card({ children, style }) {
  return (
    <View style={[{
      backgroundColor: colors.card,
      padding: spacing.lg,
      borderRadius: radii.xl,
      borderWidth: 1,
      borderColor: colors.border
    }, style]}>
      {children}
    </View>
  )
}
