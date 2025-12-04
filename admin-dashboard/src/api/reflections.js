import { API_URL } from "./client";

export async function fetchReflectionTemplates() {
  const res = await fetch(`${API_URL}/admin/reflection-templates`);
  if (!res.ok) throw new Error("Failed to fetch templates");
  return res.json();
}

export async function createReflectionTemplate(data) {
  const res = await fetch(`${API_URL}/admin/reflection-templates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create template");
  return res.json();
}

export async function updateReflectionTemplate(id, data) {
  const res = await fetch(`${API_URL}/admin/reflection-templates/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update template");
  return res.json();
}

export async function deleteReflectionTemplate(id) {
  const res = await fetch(`${API_URL}/admin/reflection-templates/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete template");
  return res.json();
}
