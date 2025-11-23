import { request } from "./client"

export const getSymptoms = () => request("/symptoms")
export const addSymptom = (data) => request("/symptoms", "POST", data)
export const updateSymptom = (id, data) =>
  request(`/symptoms/${id}`, "PUT", data)
export const deleteSymptom = (id) => request(`/symptoms/${id}`, "DELETE")

// Summary (grouped by day)
export const getSymptomSummary = () => request("/symptoms/summary")
