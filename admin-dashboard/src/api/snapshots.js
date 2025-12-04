import { API_URL } from "./client";

export async function fetchSnapshots() {
  const res = await fetch(`${API_URL}/admin/snapshots`);
  if (!res.ok) throw new Error("Failed to fetch snapshots");
  return res.json();
}

export async function createSnapshot(data) {
  const res = await fetch(`${API_URL}/admin/snapshots`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create snapshot");
  return res.json();
}

export async function updateSnapshot(id, data) {
  const res = await fetch(`${API_URL}/admin/snapshots/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update snapshot");
  return res.json();
}

export async function deleteSnapshot(id) {
  const res = await fetch(`${API_URL}/admin/snapshots/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete snapshot");
  return res.json();
}
