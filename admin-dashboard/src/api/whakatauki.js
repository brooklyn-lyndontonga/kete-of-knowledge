import { API_URL } from "./client";

export async function fetchWhakatauki() {
  const res = await fetch(`${API_URL}/admin/whakatauki`);
  if (!res.ok) throw new Error("Failed to fetch whakatauki");
  return res.json();
}

export async function createWhakatauki(data) {
  const res = await fetch(`${API_URL}/admin/whakatauki`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create whakatauki");
  return res.json();
}

export async function updateWhakatauki(id, data) {
  const res = await fetch(`${API_URL}/admin/whakatauki/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update whakatauki");
  return res.json();
}

export async function deleteWhakatauki(id) {
  const res = await fetch(`${API_URL}/admin/whakatauki/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete whakatauki");
  return res.json();
}
