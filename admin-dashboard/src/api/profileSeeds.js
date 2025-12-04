import { API_URL } from "./client";

export async function fetchProfileSeeds() {
  const res = await fetch(`${API_URL}/admin/profile-seeds`);
  if (!res.ok) throw new Error("Failed to fetch seeds");
  return res.json();
}

export async function createProfileSeed(data) {
  const res = await fetch(`${API_URL}/admin/profile-seeds`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create seed");
  return res.json();
}

export async function updateProfileSeed(id, data) {
  const res = await fetch(`${API_URL}/admin/profile-seeds/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update seed");
  return res.json();
}

export async function deleteProfileSeed(id) {
  const res = await fetch(`${API_URL}/admin/profile-seeds/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete seed");
  return res.json();
}
