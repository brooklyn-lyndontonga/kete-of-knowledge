import { api } from "./client";

export function fetchSnapshots() {
  return api.get("/admin/snapshots");
}

export function createSnapshot(data) {
  return api.post("/admin/snapshots", data);
}

export function updateSnapshot(id, data) {
  return api.put(`/admin/snapshots/${id}`, data);
}

export function deleteSnapshot(id) {
  return api.delete(`/admin/snapshots/${id}`);
}
