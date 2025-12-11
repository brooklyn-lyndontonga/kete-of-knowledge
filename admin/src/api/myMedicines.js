import { api } from "./client";

export function fetchMyMedicines() {
  return api.get("/user/medicines");
}

export function addMyMedicine(data) {
  return api.post("/user/medicines", data);
}

export function updateMyMedicine(id, data) {
  return api.put(`/user/medicines/${id}`, data);
}

export function deleteMyMedicine(id) {
  return api.delete(`/user/medicines/${id}`);
}
