import { api } from "../../api/adminClient"

// GET all
export async function fetchWhakatauki({ signal } = {}) {
  const { data } = await api.get(
    "/api/admin/whakatauki",
    { signal }
  )
  return data
}

// CREATE
export async function createWhakatauki(payload) {
  const { data } = await api.post(
    "/api/admin/whakatauki",
    payload
  )
  return data
}

// UPDATE
export async function updateWhakatauki(id, payload) {
  const { data } = await api.put(
    `/api/admin/whakatauki/${id}`,
    payload
  )
  return data
}

// DELETE
export async function deleteWhakatauki(id) {
  const { data } = await api.delete(
    `/api/admin/whakatauki/${id}`
  )
  return data
}
