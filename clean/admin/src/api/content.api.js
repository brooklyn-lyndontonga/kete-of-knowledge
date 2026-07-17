/**
 * Admin content API layer.
 *
 * Instead of reading a JWT from localStorage, this module accepts a
 * `getToken` function (supplied by the Auth0 auth-context) that returns
 * a fresh access token on every request.
 *
 * Call `initContentApi(getToken)` once during app bootstrap (from App.jsx
 * or AuthProvider) before any fetches fire.
 */

const DEFAULT_API_URL = "http://localhost:3000"
const API_ROOT = (import.meta.env.VITE_API_URL || DEFAULT_API_URL).replace(
  /\/$/,
  ""
)
const ADMIN_API = `${API_ROOT}/api/admin`

// ─── Token getter (set once from AuthProvider) ───────────
let _getToken = null

/**
 * Bind the Auth0 token getter so all subsequent adminFetch calls
 * include a valid Bearer token.
 */
export function initContentApi(getTokenFn) {
  _getToken = getTokenFn
}

// ─── Core fetch wrapper ──────────────────────────────────
const adminFetch = async (url, options = {}) => {
  const headers = { ...(options.headers || {}) }

  if (_getToken) {
    try {
      const token = await _getToken()
      headers.Authorization = `Bearer ${token}`
    } catch (err) {
      console.error("Failed to get access token for API request", err)
      // If we can't get a token, proceed without one — the server will 401
    }
  }

  const res = await fetch(url, { ...options, headers })

  if (res.status === 401) {
    // Session expired or invalid — Auth0 SDK will handle re-auth on next
    // interaction, but force a page reload to trigger the redirect flow.
    window.location.reload()
    throw new Error("Unauthorized")
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || `HTTP error! status: ${res.status}`)
  }

  return res
}

// ─── Snapshots ───────────────────────
export const fetchSnapshots = (opts) =>
  adminFetch(`${ADMIN_API}/snapshots`, opts).then(r => r.json())

export const createSnapshot = (data) =>
  adminFetch(`${ADMIN_API}/snapshots`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const updateSnapshot = (id, data) =>
  adminFetch(`${ADMIN_API}/snapshots/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const deleteSnapshot = (id) =>
  adminFetch(`${ADMIN_API}/snapshots/${id}`, {
    method: "DELETE",
  })

// ─── Whakatauki ──────────────────────
export const fetchWhakatauki = (showArchived = false) =>
  adminFetch(`${ADMIN_API}/whakatauki${showArchived ? "?showArchived=true" : ""}`).then(r => r.json())

export const createWhakatauki = (data) =>
  adminFetch(`${ADMIN_API}/whakatauki`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const updateWhakatauki = (id, data) =>
  adminFetch(`${ADMIN_API}/whakatauki/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const deleteWhakatauki = (id) =>
  adminFetch(`${ADMIN_API}/whakatauki/${id}`, { method: "DELETE" })

export const restoreWhakatauki = (id) =>
  adminFetch(`${ADMIN_API}/whakatauki/${id}/restore`, { method: "POST" })

// ─── Reflection Templates ────────────
export const fetchReflectionTemplates = (showArchived = false) =>
  adminFetch(`${ADMIN_API}/reflection-templates${showArchived ? "?showArchived=true" : ""}`).then(r => r.json())

export const createReflectionTemplate = (data) =>
  adminFetch(`${ADMIN_API}/reflection-templates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const updateReflectionTemplate = (id, data) =>
  adminFetch(`${ADMIN_API}/reflection-templates/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const deleteReflectionTemplate = (id) =>
  adminFetch(`${ADMIN_API}/reflection-templates/${id}`, { method: "DELETE" })

export const restoreReflectionTemplate = (id) =>
  adminFetch(`${ADMIN_API}/reflection-templates/${id}/restore`, { method: "POST" })

// ─── Profile Seeds ───────────────────
export const fetchProfileSeeds = (showArchived = false) =>
  adminFetch(`${ADMIN_API}/profile-seeds${showArchived ? "?showArchived=true" : ""}`).then(r => r.json())

export const createProfileSeed = (data) =>
  adminFetch(`${ADMIN_API}/profile-seeds`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const updateProfileSeed = (id, data) =>
  adminFetch(`${ADMIN_API}/profile-seeds/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const deleteProfileSeed = (id) =>
  adminFetch(`${ADMIN_API}/profile-seeds/${id}`, {
    method: "DELETE",
  })

export const restoreProfileSeed = (id) =>
  adminFetch(`${ADMIN_API}/profile-seeds/${id}/restore`, { method: "POST" })

// ─── Learning Resources ──────────────
export const fetchLearningResources = (showArchived = false) =>
  adminFetch(`${ADMIN_API}/learning-resources${showArchived ? "?showArchived=true" : ""}`).then(r => r.json())

export const createLearningResource = (data) =>
  adminFetch(`${ADMIN_API}/learning-resources`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const updateLearningResource = (id, data) =>
  adminFetch(`${ADMIN_API}/learning-resources/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const deleteLearningResource = (id) =>
  adminFetch(`${ADMIN_API}/learning-resources/${id}`, { method: "DELETE" })

export const restoreLearningResource = (id) =>
  adminFetch(`${ADMIN_API}/learning-resources/${id}/restore`, { method: "POST" })

// ─── Conditions ──────────────────────
export const fetchConditions = (showArchived = false) =>
  adminFetch(`${ADMIN_API}/conditions${showArchived ? "?showArchived=true" : ""}`).then(r => r.json())

export const createCondition = (data) =>
  adminFetch(`${ADMIN_API}/conditions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const updateCondition = (id, data) =>
  adminFetch(`${ADMIN_API}/conditions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const deleteCondition = (id) =>
  adminFetch(`${ADMIN_API}/conditions/${id}`, { method: "DELETE" })

export const restoreCondition = (id) =>
  adminFetch(`${ADMIN_API}/conditions/${id}/restore`, { method: "POST" })

// ─── Audit Logs ──────────────────────
export const fetchAuditLogs = (opts) =>
  adminFetch(`${ADMIN_API}/audit-logs`, opts).then(r => r.json())

// ─── Media Upload ────────────────────
export const uploadMediaFile = (file) => {
  const formData = new FormData()
  formData.append("file", file)

  return adminFetch(`${ADMIN_API}/media/upload`, {
    method: "POST",
    body: formData,
  }).then(r => r.json())
}
