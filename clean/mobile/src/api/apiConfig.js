import Constants from "expo-constants"

const DEFAULT_API_ROOT = "http://localhost:3000"

function getExpoHostUrl() {
  const hostUri =
    Constants.expoConfig?.hostUri ??
    Constants.manifest?.debuggerHost ??
    Constants.manifest2?.extra?.expoClient?.hostUri

  if (!hostUri || typeof hostUri !== "string") return null

  const host = hostUri.split(":")[0]
  if (!host) return null

  return `http://${host}:3000`
}

export const API_ROOT = (
  process.env.EXPO_PUBLIC_API_URL ||
  getExpoHostUrl() ||
  DEFAULT_API_ROOT
).replace(/\/$/, "")

export const API_BASE_URL = `${API_ROOT}/api`
export const APP_API_BASE_URL = `${API_BASE_URL}/app`
