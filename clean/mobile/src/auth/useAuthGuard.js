import { Alert } from "react-native"
import { useAuth } from "./AuthContext"

export function useAuthGuard() {
  const { isGuest, login, authReady } = useAuth()

  return (action) => {
    if (!isGuest) {
      if (typeof action === "function") action()
      return true
    }

    Alert.alert(
      "Sign in required",
      "Please sign in to add or edit your health information.",
      [
        { text: "Not now", style: "cancel" },
        {
          text: "Sign in",
          onPress: () => {
            if (authReady) login()
          },
        },
      ]
    )

    return false
  }
}
