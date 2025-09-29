// src/navigation/guards.js
import React, { useEffect } from "react"
import { useAuth } from "../app/providers/AuthProvider"

export function requireAuth(ScreenComponent) {
  // Wrap a screen so guests get bounced to Launch
  return function Guarded(props) {
    const { isGuest } = useAuth()
    useEffect(() => {
      if (isGuest) props.navigation.replace("Launch")
    }, [isGuest, props.navigation])
    if (isGuest) return null
    return <ScreenComponent {...props} />
  }
}
