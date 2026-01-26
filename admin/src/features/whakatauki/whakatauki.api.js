import { api } from "../../api/adminClient"

// GET all
export async function fetchWhakatauki({ signal } = {}) {
  const { data } = await api.get("/whakatauki", { signal })
  return data
}

// CREATE
export async function createWhakatauki(payload) {
  const { data } = await api.post("/whakatauki", payload)
  return data
}

// UPDATE (not wired yet — leave for later)
export async function updateWhakatauki(id, payload) {
  const { data } = await api.put(`/whakatauki/${id}`, payload)
  return data
}

// DELETE (not wired yet — leave for later)
export async function deleteWhakatauki(id) {
  const { data } = await api.delete(`/whakatauki/${id}`)
  return data
}
