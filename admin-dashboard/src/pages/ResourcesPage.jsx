/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
// src/pages/ResourcesPage.jsx
import React, { useEffect, useState } from "react";
import AdminTable from "../components/AdminTable";
import AdminModal from "../components/AdminModal";

import {
  fetchResources,
  createResource,
  updateResource,
  deleteResource,
  fetchResourceCategories,
} from "../api/resources";

export default function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    category_id: "",
    title: "",
    content: "",
    image_url: "",
  });

  // ----------------------
  // Load data
  // ----------------------
  async function loadData() {
    setLoading(true);
    try {
      const [resData, catData] = await Promise.all([
        fetchResources(),
        fetchResourceCategories(),
      ]);
      setResources(resData);
      setCategories(catData);
    } catch (err) {
      console.error(err);
      alert("Failed to load resources");
    }
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  // ----------------------
  // Open Add Modal
  // ----------------------
  function openAddModal() {
    setEditing(null);
    setFormData({
      category_id: "",
      title: "",
      content: "",
      image_url: "",
    });
    setIsModalOpen(true);
  }

  // ----------------------
  // Open Edit Modal
  // ----------------------
  function openEditModal(item) {
    setEditing(item);
    setFormData({
      category_id: item.category_id,
      title: item.title,
      content: item.content || "",
      image_url: item.image_url || "",
    });
    setIsModalOpen(true);
  }

  // ----------------------
  // Save
  // ----------------------
  async function handleSave() {
    if (!formData.title.trim()) return alert("A title is required");
    if (!formData.category_id) return alert("Select a category");

    try {
      if (editing) {
        await updateResource(editing.id, formData);
      } else {
        await createResource(formData);
      }

      setIsModalOpen(false);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to save resource");
    }
  }

  // ----------------------
  // Delete
  // ----------------------
  async function handleDelete(id) {
    if (!confirm("Delete this resource?")) return;
    try {
      await deleteResource(id);
      loadData();
    } catch (err) {
      alert("Failed to delete resource");
    }
  }

  const columns = [
    { key: "title", label: "Title" },
    { key: "category_name", label: "Category" },
    { key: "image_url", label: "Image" },
  ];

  return (
    <div className="page">
      <h1>Library Resources</h1>
      <p className="subtitle">Manage all educational resources for the app.</p>

      <button className="primary-btn" onClick={openAddModal}>
        + Add Resource
      </button>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <AdminTable
          columns={columns}
          data={resources}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      )}

      {/* Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        title={editing ? "Edit Resource" : "Add Resource"}
      >
        {/* Category */}
        <div className="form-group">
          <label>Category*</label>
          <select
            value={formData.category_id}
            onChange={(e) =>
              setFormData({ ...formData, category_id: Number(e.target.value) })
            }
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.icon} {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div className="form-group">
          <label>Title*</label>
          <input
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Resource title"
          />
        </div>

        {/* Content */}
        <div className="form-group">
          <label>Content</label>
          <textarea
            rows="6"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            placeholder="Main resource content..."
          />
        </div>

        {/* Image URL */}
        <div className="form-group">
          <label>Image URL</label>
          <input
            value={formData.image_url}
            onChange={(e) =>
              setFormData({ ...formData, image_url: e.target.value })
            }
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </AdminModal>
    </div>
  );
}
