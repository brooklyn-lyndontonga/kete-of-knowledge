import { api } from "../../api/adminClient"

export function fetchResourceCategories() {
  return api.get("/api/admin/resource-categories").then(r => r.data)
}

export function createResourceCategory(data) {
  return api.post("/api/admin/resource-categories", data);
}

export function updateResourceCategory(id, data) {
  return api.put(`/api/admin/resource-categories${id}`, data);
}

export function deleteResourceCategory(id) {
  return api.delete(`/api/admin/resource-categories${id}`);
}
