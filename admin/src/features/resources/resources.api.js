import { api } from "./client";

export function fetchResources() {
  return api.get("/admin/resources");
}

export function createResource(data) {
  return api.post("/admin/resources", data);
}

export function updateResource(id, data) {
  return api.put(`/admin/resources/${id}`, data);
}

export function deleteResource(id) {
  return api.delete(`/admin/resources/${id}`);
}
