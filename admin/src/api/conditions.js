import { api } from "./client";

export function fetchConditions() {
  return api.get("/admin/conditions");
}

export function createCondition(data) {
  return api.post("/admin/conditions", data);
}

export function updateCondition(id, data) {
  return api.put(`/admin/conditions/${id}`, data);
}

export function deleteCondition(id) {
  return api.delete(`/admin/conditions/${id}`);
}
