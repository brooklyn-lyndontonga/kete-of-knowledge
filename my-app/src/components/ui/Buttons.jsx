import PropTypes from "prop-types"

export default function Button({ title, onPress, style, variant = "primary" }) {
  return (
    <Pressable onPress={onPress} style={style} accessibilityRole="button">
      <Text>{title}</Text>
    </Pressable>
  )
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  variant: PropTypes.oneOf(["primary", "secondary", "ghost"]),
}
