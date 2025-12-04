// src/api/supportContacts.js
import { API_URL } from "./client";

export async function fetchSupportContacts() {
  const res = await fetch(`${API_URL}/admin/support`);
  if (!res.ok) throw new Error("Failed to fetch support contacts");
  return res.json();
}

export async function createSupportContact(data) {
  const res = await fetch(`${API_URL}/admin/support`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create support contact");
  return res.json();
}

export async function updateSupportContact(id, data) {
  const res = await fetch(`${API_URL}/admin/support/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update support contact");
  return res.json();
}

export async function deleteSupportContact(id) {
  const res = await fetch(`${API_URL}/admin/support/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete support contact");
  return res.json();
}
