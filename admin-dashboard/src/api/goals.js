import { request } from "./client"

export const getGoals = () => request("/goals")
export const addGoal = (data) => request("/goals", "POST", data)
export const updateGoal = (id, data) =>
  request(`/goals/${id}`, "PUT", data)
export const deleteGoal = (id) => request(`/goals/${id}`, "DELETE")
