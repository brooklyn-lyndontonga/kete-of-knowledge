import { api } from "./client";

export function fetchGoals() {
  return api.get("/user/goals");
}

export function createGoal(data) {
  return api.post("/user/goals", data);
}

export function updateGoal(id, data) {
  return api.put(`/user/goals/${id}`, data);
}

export function deleteGoal(id) {
  return api.delete(`/user/goals/${id}`);
}
