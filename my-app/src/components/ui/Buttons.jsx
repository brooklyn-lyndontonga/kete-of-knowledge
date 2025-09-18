import { TouchableOpacity, Text } from "react-native"
import { colors, spacing, radii } from "../../theme"

export default function Button({ title, onPress, style, variant = "primary" }) {
  const bg = variant === "primary" ? colors.primary : colors.secondary
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{
        backgroundColor: bg,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        borderRadius: radii.lg,
        alignItems: "center"
      }, style]}
    >
      <Text style={{ color: "white", fontWeight: "600" }}>{title}</Text>
    </TouchableOpacity>
  )
}
