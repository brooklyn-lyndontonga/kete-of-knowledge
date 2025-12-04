// src/api/resourceCategories.js
import { API_URL } from "./client";

// GET all categories
export async function fetchResourceCategories() {
  const res = await fetch(`${API_URL}/admin/resource-categories`);
  if (!res.ok) throw new Error("Failed to fetch resource categories");
  return res.json();
}

// POST create a category
export async function createResourceCategory(data) {
  const res = await fetch(`${API_URL}/admin/resource-categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create resource category");
  return res.json();
}

// PUT update a category
export async function updateResourceCategory(id, data) {
  const res = await fetch(`${API_URL}/admin/resource-categories/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update resource category");
  return res.json();
}

// DELETE remove category
export async function deleteResourceCategory(id) {
  const res = await fetch(`${API_URL}/admin/resource-categories/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete resource category");
  return res.json();
}
