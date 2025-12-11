import { api } from "./client"

export function fetchProfileSeeds() {
  return api.get("/admin/profile-seeds")
}

export function createProfileSeed(body) {
  return api.post("/admin/profile-seeds", body)
}

export function updateProfileSeed(id, body) {
  return api.put(`/admin/profile-seeds/${id}`, body)
}

export function deleteProfileSeed(id) {
  return api.delete(`/admin/profile-seeds/${id}`)
}
