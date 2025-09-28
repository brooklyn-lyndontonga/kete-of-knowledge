import * as Linking from "expo-linking"
const prefix = Linking.createURL("/")
export const linking = {
  prefixes: [prefix, "keteofknowledge://"],
  config: { screens: { AuthReturn: "auth" } }
}
