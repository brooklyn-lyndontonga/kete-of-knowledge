import { api } from "./client";

export function fetchProfileSeeds() {
  return api.get("/admin/profileSeeds");
}

export function createProfileSeed(data) {
  return api.post("/admin/profileSeeds", data);
}

export function updateProfileSeed(id, data) {
  return api.put(`/admin/profileSeeds/${id}`, data);
}

export function deleteProfileSeed(id) {
  return api.delete(`/admin/profileSeeds/${id}`);
}
