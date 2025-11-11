import { createNavigationContainerRef, StackActions } from "@react-navigation/native";

// 🔗 The navigation ref object that other modules can use
export const navigationRef = createNavigationContainerRef();

// 🔧 Navigate from anywhere (e.g., DevBypass)
export function nav(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  } else {
    console.warn("Navigation not ready yet");
  }
}

// 🔧 Reset the entire stack to a new route
export function resetTo(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  } else {
    console.warn("Navigation not ready yet");
  }
}
