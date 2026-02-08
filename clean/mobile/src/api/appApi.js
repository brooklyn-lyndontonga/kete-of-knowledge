import { getCached, setCached } from "../storage/cache"
import { APP_API_BASE_URL } from "./apiConfig"

const API_BASE_URL = APP_API_BASE_URL

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
