const API_URL = "http://localhost:3000"

// ─── Whakatauki ─────────────────────
export const fetchWhakatauki = (opts) =>
  fetch(`${API_URL}/whakatauki`, opts).then(r => r.json())

export const createWhakatauki = (data) =>
  fetch(`${API_URL}/whakatauki`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const updateWhakatauki = (id, data) =>
  fetch(`${API_URL}/whakatauki/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const deleteWhakatauki = (id) =>
  fetch(`${API_URL}/whakatauki/${id}`, { method: "DELETE" })

// ─── Reflection Templates ────────────
export const fetchReflectionTemplates = (opts) =>
  fetch(`${API_URL}/reflection-templates`, opts).then(r => r.json())

export const createReflectionTemplate = (data) =>
  fetch(`${API_URL}/reflection-templates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const updateReflectionTemplate = (id, data) =>
  fetch(`${API_URL}/reflection-templates/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const deleteReflectionTemplate = (id) =>
  fetch(`${API_URL}/reflection-templates/${id}`, { method: "DELETE" })

// ─── Profile Seeds ───────────────────
export const fetchProfileSeeds = (opts) =>
  fetch(`${API_URL}/profile-seeds`, opts).then(r => r.json())

export const createProfileSeed = (data) =>
  fetch(`${API_URL}/profile-seeds`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const updateProfileSeed = (id, data) =>
  fetch(`${API_URL}/profile-seeds/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const deleteProfileSeed = (id) =>
  fetch(`${API_URL}/profile-seeds/${id}`, { method: "DELETE" })

// ─── Conditions ──────────────────────
export const fetchConditions = (opts) =>
  fetch(`${API_URL}/conditions`, opts).then(r => r.json())

export const createCondition = (data) =>
  fetch(`${API_URL}/conditions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const updateCondition = (id, data) =>
  fetch(`${API_URL}/conditions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json())

export const deleteCondition = (id) =>
  fetch(`${API_URL}/conditions/${id}`, { method: "DELETE" })
