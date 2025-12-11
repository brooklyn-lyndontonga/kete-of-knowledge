import { api } from "./client";

export function fetchReflectionTemplates() {
  return api.get("/admin/reflectionTemplates");
}

export function createReflectionTemplate(data) {
  return api.post("/admin/reflectionTemplates", data);
}

export function updateReflectionTemplate(id, data) {
  return api.put(`/admin/reflectionTemplates/${id}`, data);
}

export function deleteReflectionTemplate(id) {
  return api.delete(`/admin/reflectionTemplates/${id}`);
}
