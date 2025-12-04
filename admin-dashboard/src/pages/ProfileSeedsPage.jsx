/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import AdminTable from "../components/AdminTable";
import AdminModal from "../components/AdminModal";
import {
  fetchProfileSeeds,
  createProfileSeed,
  updateProfileSeed,
  deleteProfileSeed,
} from "../api/profileSeeds";

export default function ProfileSeedsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [formData, setFormData] = useState({
    label: "",
    value: "",
  });

  async function loadData() {
    setLoading(true);
    const data = await fetchProfileSeeds();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

  function openAdd() {
    setEditing(null);
    setFormData({ label: "", value: "" });
    setIsModalOpen(true);
  }

  function openEdit(item) {
    setEditing(item);
    setFormData({
      label: item.label,
      value: item.value,
    });
    setIsModalOpen(true);
  }

  async function handleSave() {
    if (!formData.label.trim()) return alert("Label required");

    if (editing) await updateProfileSeed(editing.id, formData);
    else await createProfileSeed(formData);

    setIsModalOpen(false);
    loadData();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this seed?")) return;
    await deleteProfileSeed(id);
    loadData();
  }

  const columns = [
    { key: "label", label: "Label" },
    { key: "value", label: "Value" },
  ];

  return (
    <div className="page">
      <h1>Profile Seeds</h1>
      <button className="primary-btn" onClick={openAdd}>+ Add Seed</button>

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
        title={editing ? "Edit Seed" : "Add Seed"}
        onSave={handleSave}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="form-group">
          <label>Label*</label>
          <input
            value={formData.label}
            onChange={(e) =>
              setFormData({ ...formData, label: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Value</label>
          <input
            value={formData.value}
            onChange={(e) =>
              setFormData({ ...formData, value: e.target.value })
            }
          />
        </div>
      </AdminModal>
    </div>
  );
}
