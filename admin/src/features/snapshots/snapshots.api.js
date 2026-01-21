 
import { api } from "../../api/adminClient"

// Fetch all snapshots
export async function fetchSnapshots() {
  const { data } = await api.get("/api/admin/snapshots")
  return data
}

// Create snapshot
export async function createSnapshot(snapshot) {
  const { data } = await api.post("/api/admin/snapshots", snapshot)
  return data
}

// Update snapshot
export async function updateSnapshot(id, snapshot) {
  const { data } = await api.put(`/api/admin/snapshots/${id}`, snapshot)
  return data
}

// Delete snapshot
export async function deleteSnapshot(id) {
  const { data } = await api.delete(`/api/admin/snapshots/${id}`)
  return data
}
