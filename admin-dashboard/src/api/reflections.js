import { api } from "./client";

export function fetchUserReflections() {
  return api.get("/user/reflections");
}

export function createUserReflection(data) {
  return api.post("/user/reflections", data);
}

export function updateUserReflection(id, data) {
  return api.put(`/user/reflections/${id}`, data);
}

export function deleteUserReflection(id) {
  return api.delete(`/user/reflections/${id}`);
}
