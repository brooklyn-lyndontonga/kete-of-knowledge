/* eslint-disable no-empty-pattern */
import { api } from "./client"

// Fetch all snapshots
export async function fetchSnapshots({ } = {}) {
  return api.get("/admin/snapshots")
}

// Create snapshot
export async function createSnapshot(data) {
  return api.post("/admin/snapshots", data)
}

// Update snapshot
export async function updateSnapshot(id, data) {
  return api.put(`/admin/snapshots/${id}`, data)
}

// Delete snapshot
export async function deleteSnapshot(id) {
  return api.delete(`/admin/snapshots/${id}`)
}
