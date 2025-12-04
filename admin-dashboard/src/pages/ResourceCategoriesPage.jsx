/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
// src/pages/ResourceCategoriesPage.jsx
import React, { useEffect, useState } from "react";
import AdminTable from "../components/AdminTable";
import AdminModal from "../components/AdminModal";

import {
  fetchResourceCategories,
  createResourceCategory,
  updateResourceCategory,
  deleteResourceCategory,
} from "../api/resourceCategories";

export default function ResourceCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // Form
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
  });

  // -----------------------------
  // Load data on mount
  // -----------------------------
  async function loadData() {
    setLoading(true);
    try {
      const data = await fetchResourceCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load categories");
    }
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  // -----------------------------
  // Open modals
  // -----------------------------
  function openAddModal() {
    setEditing(null);
    setFormData({ name: "", icon: "" });
    setIsModalOpen(true);
  }

  function openEditModal(data) {
    setEditing(data);
    setFormData({
      name: data.name,
      icon: data.icon || "",
    });
    setIsModalOpen(true);
  }

  // -----------------------------
  // Save
  // -----------------------------
  async function handleSave() {
    if (!formData.name.trim()) {
      return alert("A category name is required");
    }

    const payload = {
      name: formData.name.trim(),
      icon: formData.icon.trim(),
    };

    try {
      if (editing) {
        await updateResourceCategory(editing.id, payload);
      } else {
        await createResourceCategory(payload);
      }

      setIsModalOpen(false);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to save category");
    }
  }

  // -----------------------------
  // Delete
  // -----------------------------
  async function handleDelete(id) {
    if (!confirm("Delete this category? All linked resources remain but will lose this category.")) return;

    try {
      await deleteResourceCategory(id);
      loadData();
    } catch (err) {
      alert("Failed to delete category");
    }
  }

  // -----------------------------
  // Table columns
  // -----------------------------
  const columns = [
    { key: "icon", label: "Icon" },
    { key: "name", label: "Category Name" },
  ];

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="page">
      <h1>Resource Categories</h1>
      <p className="subtitle">Manage the top-level categories in the app's library.</p>

      <button className="primary-btn" onClick={openAddModal}>
        + Add Category
      </button>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <AdminTable
          columns={columns}
          data={categories}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      )}

      {/* Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        title={editing ? "Edit Category" : "Add Category"}
      >
        <div className="form-group">
          <label>Emoji Icon</label>
          <input
            placeholder="📘"
            value={formData.icon}
            onChange={(e) =>
              setFormData({ ...formData, icon: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Category Name*</label>
          <input
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="Nutrition, Movement, Rongoā…"
          />
        </div>
      </AdminModal>
    </div>
  );
}
