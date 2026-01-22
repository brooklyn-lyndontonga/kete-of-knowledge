import { useNavigationState } from "@react-navigation/native"

export default function useNavigationDepth() {
  return useNavigationState(
    (state) => (state?.routes?.length ?? 1) - 1
  )
}
