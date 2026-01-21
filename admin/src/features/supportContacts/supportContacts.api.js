import { api } from "../../api/adminClient"

// GET all
export async function fetchSupportContacts({ signal } = {}) {
  const { data } = await api.get(
    "/api/admin/support",
    { signal }
  )
  return data
}

// CREATE
export async function createSupport(payload) {
  const { data } = await api.post(
    "/api/admin/support",
    payload
  )
  return data
}

// UPDATE
export async function updateSupport(id, payload) {
  const { data } = await api.put(
    `/api/admin/support/${id}`,
    payload
  )
  return data
}

// DELETE
export async function deleteSupport(id) {
  const { data } = await api.delete(
    `/api/admin/support/${id}`
  )
  return data
}
