import { createNavigationContainerRef } from "@react-navigation/native"

export const navigationRef = createNavigationContainerRef()

export function nav(name, params) {
  if (navigationRef.isReady()) navigationRef.navigate(name, params)
}
