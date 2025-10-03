import { createNavigationContainerRef } from "@react-navigation/native"

export const navigationRef = createNavigationContainerRef()

export function nav(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params)
  } else {
    console.warn("nav(): navigation not ready", { name, params })
  }
}

export function resetTo(routes, index = 0) {
  if (navigationRef.isReady()) {
    navigationRef.reset({ index, routes })
  } else {
    console.warn("resetTo(): navigation not ready", { routes, index })
  }
}
