import { useState, useEffect } from "react";
import api from "../../lib/api";

export function useGoals() {
  const [goals, setGoals] = useState([]);

  async function loadGoals() {
    const res = await api.get("/goals");
    setGoals(res.data);
  }

  async function addGoal(title, description = "") {
    const res = await api.post("/goals", { title, description });
    setGoals([...goals, res.data]);
  }

  async function deleteGoal(id) {
    await api.delete(`/goals/${id}`);
    setGoals(goals.filter((g) => g.id !== id));
  }

  useEffect(() => {
    loadGoals();
  }, []);

  return { goals, addGoal, deleteGoal };
}
