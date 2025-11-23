import { request } from "./client"

export const getResources = () => request("/resources")
export const addResource = (data) => request("/resources", "POST", data)
export const updateResource = (id, data) =>
  request(`/resources/${id}`, "PUT", data)
export const deleteResource = (id) =>
  request(`/resources/${id}`, "DELETE")
