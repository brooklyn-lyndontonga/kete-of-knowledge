import * as React from "react"
import { CommonActions } from "@react-navigation/native"

export const navigationRef = React.createRef()

export function nav(name, params) {
  if (!navigationRef.current?.isReady()) return
  navigationRef.current.navigate(name, params)
}

export function resetTo(stateArray) {
  if (!navigationRef.current?.isReady()) return
  navigationRef.current.dispatch(
    CommonActions.reset({
      index: 0,
      routes: stateArray,
    })
  )
}
