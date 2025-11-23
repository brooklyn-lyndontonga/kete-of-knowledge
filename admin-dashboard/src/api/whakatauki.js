import { request } from "./client"

export const getWhakatauki = () => request("/whakatauki")
export const addWhakatauki = (data) => request("/whakatauki", "POST", data)
export const updateWhakatauki = (id, data) =>
  request(`/whakatauki/${id}`, "PUT", data)
export const deleteWhakatauki = (id) =>
  request(`/whakatauki/${id}`, "DELETE")
