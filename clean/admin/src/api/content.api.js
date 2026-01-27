const API_URL = "http://localhost:3000"
const ADMIN_API = `${API_URL}/api/admin`

// ─── Snapshots ───────────────────────
export const fetchSnapshots = (opts) =>
  fetch(`${ADMIN_API}/snapshots`, opts).then(r => r.json())

export const createSnapshot = (data) =>
  fetch(`${ADMIN_API}/snapshots`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const updateSnapshot = (id, data) =>
  fetch(`${ADMIN_API}/snapshots/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const deleteSnapshot = (id) =>
  fetch(`${ADMIN_API}/snapshots/${id}`, {
    method: "DELETE",
  })

// ─── Whakatauki ──────────────────────
export const fetchWhakatauki = (opts) =>
  fetch(`${ADMIN_API}/whakatauki`, opts).then(r => r.json())

export const createWhakatauki = (data) =>
  fetch(`${ADMIN_API}/whakatauki`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const updateWhakatauki = (id, data) =>
  fetch(`${ADMIN_API}/whakatauki/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const deleteWhakatauki = (id) =>
  fetch(`${ADMIN_API}/whakatauki/${id}`, { method: "DELETE" })

// ─── Reflection Templates ────────────
export const fetchReflectionTemplates = (opts) =>
  fetch(`${ADMIN_API}/reflection-templates`, opts).then(r => r.json())

export const createReflectionTemplate = (data) =>
  fetch(`${ADMIN_API}/reflection-templates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const updateReflectionTemplate = (id, data) =>
  fetch(`${ADMIN_API}/reflection-templates/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const deleteReflectionTemplate = (id) =>
  fetch(`${ADMIN_API}/reflection-templates/${id}`, { method: "DELETE" })

// ─── Profile Seeds ───────────────────
export const fetchProfileSeeds = (opts) =>
  fetch(`${ADMIN_API}/profile-seeds`, opts).then(r => r.json())

export const createProfileSeed = (data) =>
  fetch(`${ADMIN_API}/profile-seeds`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const updateProfileSeed = (id, data) =>
  fetch(`${ADMIN_API}/profile-seeds/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const deleteProfileSeed = (id) =>
  fetch(`${ADMIN_API}/profile-seeds/${id}`, {
    method: "DELETE",
  })

// ─── Learning Resources ──────────────
export const fetchLearningResources = (opts) =>
  fetch(`${ADMIN_API}/learning-resources`, opts).then(r => r.json())

export const createLearningResource = (data) =>
  fetch(`${ADMIN_API}/learning-resources`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const updateLearningResource = (id, data) =>
  fetch(`${ADMIN_API}/learning-resources/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const deleteLearningResource = (id) =>
  fetch(`${ADMIN_API}/learning-resources/${id}`, { method: "DELETE" })

// ─── Conditions ──────────────────────
export const fetchConditions = (opts) =>
  fetch(`${ADMIN_API}/conditions`, opts).then(r => r.json())

export const createCondition = (data) =>
  fetch(`${ADMIN_API}/conditions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const updateCondition = (id, data) =>
  fetch(`${ADMIN_API}/conditions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const deleteCondition = (id) =>
  fetch(`${ADMIN_API}/conditions/${id}`, { method: "DELETE" })
