import { api } from "./client";

export function fetchSupportContacts() {
  return api.get("/admin/support");
}

export function createSupportContact(data) {
  return api.post("/admin/support", data);
}

export function updateSupportContact(id, data) {
  return api.put(`/admin/support/${id}`, data);
}

export function deleteSupportContact(id) {
  return api.delete(`/admin/support/${id}`);
}
