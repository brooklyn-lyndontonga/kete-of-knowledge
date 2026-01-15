import { useMemo } from "react"
import { generateInsights } from "../insights/generateInsights"

export function useInsights(symptoms) {
  return useMemo(() => generateInsights(symptoms), [symptoms])
}
