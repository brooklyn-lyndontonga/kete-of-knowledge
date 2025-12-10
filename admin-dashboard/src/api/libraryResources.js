import { api } from "./client";

export function fetchLibraryResources() {
  return api.get("/admin/libraryResources");
}

export function createLibraryResource(data) {
  return api.post("/admin/libraryResources", data);
}

export function updateLibraryResource(id, data) {
  return api.put(`/admin/libraryResources/${id}`, data);
}

export function deleteLibraryResource(id) {
  return api.delete(`/admin/libraryResources/${id}`);
}
