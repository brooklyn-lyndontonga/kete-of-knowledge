import { api } from "../../api/adminClient"

export function fetchResources() {
  return api.get("/api/admin/resources").then(r => r.data)
}

export function createResource(data) {
  return api.post("/api/admin/resources", data)
}

export function updateResource(id, data) {
  return api.put(`/api/admin/resources/${id}`, data)
}

export function deleteResource(id) {
  return api.delete(`/api/admin/resources/${id}`)
}
