import Constants from "expo-constants"
import { getCached, setCached } from "../storage/cache"

const DEFAULT_API_URL = "http://localhost:3000"

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

const API_ROOT = (
  process.env.EXPO_PUBLIC_API_URL ||
  getExpoHostUrl() ||
  DEFAULT_API_URL
).replace(/\/$/, "")

const API_BASE_URL = `${API_ROOT}/api/app`

// --------------------
// Generic fetch helper
// --------------------
async function fetchJson(endpoint) {
  const res = await fetch(`${API_BASE_URL}${endpoint}`)

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`)
  }

  return res.json()
}

// =======================
// WHAKATAUKI (READ ONLY)
// =======================
export async function fetchWhakatauki() {
  const cacheKey = "whakatauki"

  const cached = await getCached(cacheKey)

  // background refresh
  fetchJson("/whakatauki")
    .then((fresh) => setCached(cacheKey, fresh))
    .catch(() => {}) // offline-safe

  if (cached) return cached

  const fresh = await fetchJson("/whakatauki")
  await setCached(cacheKey, fresh)
  return fresh
}

// =======================
// LEARNING RESOURCES (READ ONLY)
// =======================
export async function fetchLearningResources() {
  const cacheKey = "learning-resources"

  const cached = await getCached(cacheKey)

  // background refresh
  fetchJson("/learning-resources")
    .then((fresh) => setCached(cacheKey, fresh))
    .catch(() => {}) // offline-safe

  if (cached) return cached

  const fresh = await fetchJson("/learning-resources")
  await setCached(cacheKey, fresh)
  return fresh
}
