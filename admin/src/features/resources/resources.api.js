import { api } from "../../api/adminClient"

// GET all resources
export async function fetchResources({ signal } = {}) {
  const { data } = await api.get("/api/admin/resources", { signal })
  return data
}

// CREATE
export async function createResource(resource) {
  const { data } = await api.post("/api/admin/resources", resource)
  return data
}

// UPDATE
export async function updateResource(id, resource) {
  const { data } = await api.put(
    `/api/admin/resources/${id}`,
    resource
  )
  return data
}

// DELETE
export async function deleteResource(id) {
  const { data } = await api.delete(
    `/api/admin/resources/${id}`
  )
  return data
}
