import { api } from "../../api/adminClient"

// GET all profile seeds
export async function fetchProfileSeeds({ signal } = {}) {
  const { data } = await api.get("/api/admin/profile-seeds", { signal })
  return data
}

// CREATE
export async function createProfileSeed(seed) {
  const { data } = await api.post("/api/admin/profile-seeds", seed)
  return data
}

// UPDATE
export async function updateProfileSeed(id, seed) {
  const { data } = await api.put(`/api/admin/profile-seeds/${id}`, seed)
  return data
}

// DELETE
export async function deleteProfileSeed(id) {
  const { data } = await api.delete(`/api/admin/profile-seeds/${id}`)
  return data
}
