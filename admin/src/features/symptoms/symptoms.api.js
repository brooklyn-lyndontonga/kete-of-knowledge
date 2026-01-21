import { api } from "../../api/adminClient"

// GET all symptoms (admin-managed)
export async function fetchSymptoms({ signal } = {}) {
  const { data } = await api.get(
    "/api/admin/symptoms",
    { signal }
  )
  return data
}

// CREATE
export async function createSymptom(payload) {
  const { data } = await api.post(
    "/api/admin/symptoms",
    payload
  )
  return data
}

// UPDATE
export async function updateSymptom(id, payload) {
  const { data } = await api.put(
    `/api/admin/symptoms/${id}`,
    payload
  )
  return data
}

// DELETE
export async function deleteSymptom(id) {
  const { data } = await api.delete(
    `/api/admin/symptoms/${id}`
  )
  return data
}
