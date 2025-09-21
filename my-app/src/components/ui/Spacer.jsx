
export default function Spacer({ size = 12, horizontal=false }) {
  return <View style={horizontal ? { width: size } : { height: size }} />
}
