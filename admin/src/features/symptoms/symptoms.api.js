import { api } from "../../api/adminClient"


export function fetchSymptoms() {
  return api.get("/user/symptoms");
}

export function createSymptom(data) {
  return api.post("/user/symptoms", data);
}

export function updateSymptom(id, data) {
  return api.put(`/user/symptoms/${id}`, data);
}

export function deleteSymptom(id) {
  return api.delete(`/user/symptoms/${id}`);
}
