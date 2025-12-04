/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import AdminTable from "../components/AdminTable";
import AdminModal from "../components/AdminModal";
import {
  fetchConditions,
  createCondition,
  updateCondition,
  deleteCondition,
} from "../api/conditions";

export default function ConditionsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    triggers: "",
    treatments: "",
    images: "",
  });

  async function loadData() {
    setLoading(true);
    const data = await fetchConditions();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  function openAdd() {
    setEditing(null);
    setFormData({
      name: "",
      description: "",
      triggers: "",
      treatments: "",
      images: "",
    });
    setIsModalOpen(true);
  }

  function openEdit(item) {
    setEditing(item);
    setFormData({
      name: item.name,
      description: item.description || "",
      triggers: (JSON.parse(item.triggers || "[]")).join(", "),
      treatments: (JSON.parse(item.treatments || "[]")).join(", "),
      images: (JSON.parse(item.images || "[]")).join(", "),
    });
    setIsModalOpen(true);
  }

  async function handleSave() {
    if (!formData.name.trim()) return alert("Condition name required");

    const payload = {
      name: formData.name,
      description: formData.description,
      triggers: JSON.stringify(formData.triggers.split(",").map((t) => t.trim())),
      treatments: JSON.stringify(formData.treatments.split(",").map((t) => t.trim())),
      images: JSON.stringify(formData.images.split(",").map((i) => i.trim())),
    };

    if (editing) {
      await updateCondition(editing.id, payload);
    } else {
      await createCondition(payload);
    }

    setIsModalOpen(false);
    loadData();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this condition?")) return;
    await deleteCondition(id);
    loadData();
  }

  const columns = [
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
  ];

  return (
    <div className="page">
      <h1>Conditions</h1>
      <button className="primary-btn" onClick={openAdd}>+ Add</button>

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
        title={editing ? "Edit Condition" : "Add Condition"}
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
          <textarea
            rows="4"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Triggers (comma separated)</label>
          <input
            value={formData.triggers}
            onChange={(e) =>
              setFormData({ ...formData, triggers: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Treatments (comma separated)</label>
          <input
            value={formData.treatments}
            onChange={(e) =>
              setFormData({ ...formData, treatments: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Images (URLs, comma separated)</label>
          <input
            value={formData.images}
            onChange={(e) =>
              setFormData({ ...formData, images: e.target.value })
            }
          />
        </div>
      </AdminModal>
    </div>
  );
}
