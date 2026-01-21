import { api } from "../../api/adminClient"

// Fetch all conditions
export async function fetchConditions({ signal } = {}) {
  const { data } = await api.get("/api/admin/conditions", { signal })
  return data
}

// Create condition
export async function createCondition(condition) {
  const { data } = await api.post("/api/admin/conditions", condition)
  return data
}

// Update condition
export async function updateCondition(id, condition) {
  const { data } = await api.put(`/api/admin/conditions/${id}`, condition)
  return data
}

// Delete condition
export async function deleteCondition(id) {
  const { data } = await api.delete(`/api/admin/conditions/${id}`)
  return data
}
