/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import AdminTable from "../components/AdminTable";
import AdminModal from "../components/AdminModal";
import {
  fetchSupportContacts,
  createSupport,
  updateSupport,
  deleteSupport,
} from "../api/support";

export default function SupportContactsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    phone: "",
    emoji: "",
  });

  async function loadData() {
    setLoading(true);
    const data = await fetchSupportContacts();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  function openAdd() {
    setEditing(null);
    setFormData({ name: "", desc: "", phone: "", emoji: "" });
    setIsModalOpen(true);
  }

  function openEdit(item) {
    setEditing(item);
    setFormData({
      name: item.name,
      desc: item.desc || "",
      phone: item.phone || "",
      emoji: item.emoji || "",
    });
    setIsModalOpen(true);
  }

  async function handleSave() {
    if (!formData.name.trim()) return alert("Name required");

    if (editing) {
      await updateSupport(editing.id, formData);
    } else {
      await createSupport(formData);
    }

    setIsModalOpen(false);
    loadData();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this support contact?")) return;
    await deleteSupport(id);
    loadData();
  }

  const columns = [
    { key: "emoji", label: "Emoji" },
    { key: "name", label: "Name" },
    { key: "desc", label: "Description" },
    { key: "phone", label: "Phone" },
  ];

  return (
    <div className="page">
      <h1>Support Contacts</h1>
      <button className="primary-btn" onClick={openAdd}>+ Add Contact</button>

      {loading ? (
        <p>Loading…</p>
      ) : (
        <AdminTable
          columns={columns}
          data={items}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      )}

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        title={editing ? "Edit Contact" : "Add Contact"}
      >
        <div className="form-group">
          <label>Name*</label>
          <input
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
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

        <div className="form-group">
          <label>Emoji</label>
          <input
            value={formData.emoji}
            onChange={(e) =>
              setFormData({ ...formData, emoji: e.target.value })
            }
            placeholder="💬"
          />
        </div>
      </AdminModal>
    </div>
  );
}
