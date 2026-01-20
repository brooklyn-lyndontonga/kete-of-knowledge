import { api } from "../../api/adminClient"


export function fetchWhakatauki() {
  return api.get("/admin/whakatauki");
}

export function createWhakatauki(data) {
  return api.post("/admin/whakatauki", data);
}

export function updateWhakatauki(id, data) {
  return api.put(`/admin/whakatauki/${id}`, data);
}

export function deleteWhakatauki(id) {
  return api.delete(`/admin/whakatauki/${id}`);
}
