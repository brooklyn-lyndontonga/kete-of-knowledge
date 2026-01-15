import { useMemo } from "react"
import { generateReflectionPrompts } from "../reflections/generateReflectionPrompts"

export function useReflectionPrompts(insights) {
  return useMemo(
    () => generateReflectionPrompts(insights),
    [insights]
  )
}

