import { api } from "./client";

export function fetchResourceCategories() {
  return api.get("/admin/resourceCategories");
}

export function createResourceCategory(data) {
  return api.post("/admin/resourceCategories", data);
}

export function updateResourceCategory(id, data) {
  return api.put(`/admin/resourceCategories/${id}`, data);
}

export function deleteResourceCategory(id) {
  return api.delete(`/admin/resourceCategories/${id}`);
}
