import { request } from "./client"

export const getMyMedicines = () => request("/mymedicines")
export const addMyMedicine = (data) =>
  request("/mymedicines", "POST", data)
export const updateMyMedicine = (id, data) =>
  request(`/mymedicines/${id}`, "PUT", data)
export const deleteMyMedicine = (id) =>
  request(`/mymedicines/${id}`, "DELETE")
