/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import AdminTable from "../components/AdminTable";
import AdminModal from "../components/AdminModal";
import {
  fetchSnapshots,
  createSnapshot,
  updateSnapshot,
  deleteSnapshot,
} from "../api/snapshots";

export default function SnapshotsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [formData, setFormData] = useState({
    label: "",
    percentage: "",
    color: "",
  });

  async function loadData() {
    setLoading(true);
    const data = await fetchSnapshots();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

  function openAdd() {
    setEditing(null);
    setFormData({ label: "", percentage: "", color: "" });
    setIsModalOpen(true);
  }

  function openEdit(item) {
    setEditing(item);
    setFormData({
      label: item.label,
      percentage: item.percentage,
      color: item.color || "",
    });
    setIsModalOpen(true);
  }

  async function handleSave() {
    const payload = {
      label: formData.label,
      percentage: Number(formData.percentage),
      color: formData.color,
    };

    if (editing) await updateSnapshot(editing.id, payload);
    else await createSnapshot(payload);

    setIsModalOpen(false);
    loadData();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this snapshot?")) return;
    await deleteSnapshot(id);
    loadData();
  }

  const columns = [
    { key: "label", label: "Label" },
    { key: "percentage", label: "Percent" },
    { key: "color", label: "Color" },
  ];

  return (
    <div className="page">
      <h1>Progress Snapshots</h1>
      <button className="primary-btn" onClick={openAdd}>+ Add Snapshot</button>

      {loading ? <p>Loading…</p> : (
        <AdminTable 
          columns={columns} 
          data={items}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      )}

      <AdminModal
        isOpen={isModalOpen}
        onSave={handleSave}
        onClose={() => setIsModalOpen(false)}
        title={editing ? "Edit Snapshot" : "Add Snapshot"}
      >
        <div className="form-group">
          <label>Label</label>
          <input 
            value={formData.label}
            onChange={(e) => setFormData({ ...formData, label: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Percentage</label>
          <input 
            type="number"
            value={formData.percentage}
            onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Color</label>
          <input 
            value={formData.color}
            placeholder="#ffcc00"
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          />
        </div>
      </AdminModal>
    </div>
  );
}
