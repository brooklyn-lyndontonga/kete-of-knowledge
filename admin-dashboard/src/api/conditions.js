import { request } from "./client"

export const getConditions = () => request("/conditions")
export const addCondition = (data) => request("/conditions", "POST", data)
export const updateCondition = (id, data) =>
  request(`/conditions/${id}`, "PUT", data)
export const deleteCondition = (id) =>
  request(`/conditions/${id}`, "DELETE")

// Optional future expansions:
export const getConditionDetail = (id) =>
  request(`/conditions/${id}`)

export const addActionToCondition = (id, action) =>
  request(`/conditions/${id}/actions`, "POST", { action })

export const addSymptomToCondition = (id, symptom) =>
  request(`/conditions/${id}/symptoms`, "POST", { symptom })
