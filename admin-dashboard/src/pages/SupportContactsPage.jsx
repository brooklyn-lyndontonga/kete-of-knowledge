/* eslint-disable no-unused-vars */
// src/pages/SupportContactsPage.jsx
import React, { useEffect, useState } from "react";
import AdminTable from "../components/AdminTable";
import AdminModal from "../components/AdminModal";
import {
  fetchSupportContacts,
  createSupportContact,
  updateSupportContact,
  deleteSupportContact,
} from "../api/supportContacts";

export default function SupportContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // Form fields
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    phone: "",
    emoji: "",
  });

  // -----------------------------
  // Load contacts on mount
  // -----------------------------
  async function loadData() {
    try {
      setLoading(true);
      const data = await fetchSupportContacts();
      setContacts(data);
    } catch (err) {
      setError("Unable to load support contacts");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  // -----------------------------
  // Open modal (add or edit)
  // -----------------------------
  function openAddModal() {
    setEditing(null);
    setFormData({ name: "", desc: "", phone: "", emoji: "" });
    setIsModalOpen(true);
  }

  function openEditModal(contact) {
    setEditing(contact);
    setFormData(contact);
    setIsModalOpen(true);
  }

  // -----------------------------
  // Save (create or update)
  // -----------------------------
  async function handleSave() {
    try {
      const payload = {
        name: formData.name.trim(),
        desc: formData.desc.trim(),
        phone: formData.phone.trim(),
        emoji: formData.emoji.trim(),
      };

      if (!payload.name) {
        alert("Name is required");
        return;
      }

      if (editing) {
        await updateSupportContact(editing.id, payload);
      } else {
        await createSupportContact(payload);
      }

      setIsModalOpen(false);
      loadData();
    } catch (err) {
      alert("Save failed, check backend logs");
    }
  }

  // -----------------------------
  // Delete
  // -----------------------------
  async function handleDelete(id) {
    if (!confirm("Delete this contact?")) return;

    try {
      await deleteSupportContact(id);
      loadData();
    } catch (err) {
      alert("Delete failed");
    }
  }

  // -----------------------------
  // Table columns
  // -----------------------------
  const columns = [
    { key: "emoji", label: "Emoji" },
    { key: "name", label: "Name" },
    { key: "desc", label: "Description" },
    { key: "phone", label: "Phone" },
  ];

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="page">
      <h1>Support Contacts</h1>
      <p className="subtitle">Edit the help services shown in the app.</p>

      <button className="primary-btn" onClick={openAddModal}>
        + Add Support Contact
      </button>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <AdminTable
          columns={columns}
          data={contacts}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      )}

      {/* ----------------------- */}
      {/* Modal */}
      {/* ----------------------- */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editing ? "Edit Contact" : "Add Contact"}
        onSave={handleSave}
      >
        <div className="form-group">
          <label>Emoji</label>
          <input
            value={formData.emoji}
            onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
            placeholder="🩺"
          />
        </div>

        <div className="form-group">
          <label>Name*</label>
          <input
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            value={formData.desc}
            onChange={(e) =>
              setFormData({ ...formData, desc: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </div>
      </AdminModal>
    </div>
  );
}
