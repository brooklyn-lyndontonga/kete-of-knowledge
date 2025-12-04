import { API_URL } from "./client";

export async function fetchConditions() {
  const res = await fetch(`${API_URL}/admin/conditions`);
  if (!res.ok) throw new Error("Failed to fetch conditions");
  return res.json();
}

export async function createCondition(data) {
  const res = await fetch(`${API_URL}/admin/conditions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create condition");
  return res.json();
}

export async function updateCondition(id, data) {
  const res = await fetch(`${API_URL}/admin/conditions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update condition");
  return res.json();
}

export async function deleteCondition(id) {
  const res = await fetch(`${API_URL}/admin/conditions/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete condition");
  return res.json();
}
