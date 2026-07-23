import { getCached, setCached } from "../storage/cache"
import { APP_API_BASE_URL } from "./apiConfig"

async function fetchJson(endpoint) {
  const res = await fetch(`${APP_API_BASE_URL}${endpoint}`)
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

/**
 * Cache-first read with a background refresh, matching the pattern
 * already used for whakataukī and learning resources so the content
 * stays readable offline.
 */
async function cachedFetch(cacheKey, endpoint) {
  const cached = await getCached(cacheKey)

  fetchJson(endpoint)
    .then((fresh) => setCached(cacheKey, fresh))
    .catch(() => {}) // offline-safe

  if (cached) return cached

  const fresh = await fetchJson(endpoint)
  await setCached(cacheKey, fresh)
  return fresh
}

export async function fetchConditions() {
  return cachedFetch("conditions", "/conditions")
}

export async function fetchCondition(id) {
  const all = await fetchConditions()
  return (Array.isArray(all) ? all : []).find(
    (c) => String(c.id) === String(id)
  ) || null
}

export async function fetchProfileSeeds() {
  return cachedFetch("profile-seeds", "/profile-seeds")
}
