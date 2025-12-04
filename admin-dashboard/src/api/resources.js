// src/api/resources.js
import { API_URL } from "./client";

export async function fetchResources() {
  const res = await fetch(`${API_URL}/admin/resources`);
  if (!res.ok) throw new Error("Failed to fetch resources");
  return res.json();
}

export async function fetchResourceCategories() {
  const res = await fetch(`${API_URL}/admin/resource-categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function createResource(data) {
  const res = await fetch(`${API_URL}/admin/resources`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create resource");
  return res.json();
}

export async function updateResource(id, data) {
  const res = await fetch(`${API_URL}/admin/resources/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update resource");
  return res.json();
}

export async function deleteResource(id) {
  const res = await fetch(`${API_URL}/admin/resources/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete resource");
  return res.json();
}
