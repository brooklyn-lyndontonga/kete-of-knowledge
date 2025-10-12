import { createNavigationContainerRef, CommonActions } from "@react-navigation/native"

export const navigationRef = createNavigationContainerRef()

export function nav(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params)
  } else {
    console.warn("⚠️ nav() called before NavigationContainer ready")
  }
}

export function resetTo(routes = [{ name: "AppTabs" }]) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: routes.length - 1,
        routes,
      })
    )
  } else {
    console.warn("⚠️ resetTo() called before NavigationContainer ready")
  }
}
