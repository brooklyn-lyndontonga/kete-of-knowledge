const DEFAULT_API_URL = "http://localhost:3000"
const API_ROOT = (import.meta.env.VITE_API_URL || DEFAULT_API_URL).replace(
  /\/$/,
  ""
)
const ADMIN_API = `${API_ROOT}/api/admin`

const getAuthToken = () => localStorage.getItem("admin_token")

const adminFetch = async (url, options = {}) => {
  const headers = { ...(options.headers || {}) }
  const token = getAuthToken()

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(url, { ...options, headers })

  if (res.status === 401) {
    localStorage.removeItem("admin_token")
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
export const fetchWhakatauki = (opts) =>
  adminFetch(`${ADMIN_API}/whakatauki`, opts).then(r => r.json())

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

// ─── Reflection Templates ────────────
export const fetchReflectionTemplates = (opts) =>
  adminFetch(`${ADMIN_API}/reflection-templates`, opts).then(r => r.json())

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

// ─── Profile Seeds ───────────────────
export const fetchProfileSeeds = (opts) =>
  adminFetch(`${ADMIN_API}/profile-seeds`, opts).then(r => r.json())

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

// ─── Learning Resources ──────────────
export const fetchLearningResources = (opts) =>
  adminFetch(`${ADMIN_API}/learning-resources`, opts).then(r => r.json())

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

// ─── Conditions ──────────────────────
export const fetchConditions = (opts) =>
  adminFetch(`${ADMIN_API}/conditions`, opts).then(r => r.json())

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
