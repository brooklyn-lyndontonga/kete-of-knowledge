/* eslint-disable unused-imports/no-unused-imports */
import { View } from "react-native";

function Spacer({ size = 12, horizontal = false }) {
  return <View style={horizontal ? { width: size } : { height: size }} />;
}

export default Spacer;
