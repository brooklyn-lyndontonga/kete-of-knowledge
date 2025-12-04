/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import AdminTable from "../components/AdminTable";
import AdminModal from "../components/AdminModal";
import {
  fetchWhakatauki,
  createWhakatauki,
  updateWhakatauki,
  deleteWhakatauki,
} from "../api/whakatauki";

export default function WhakataukiPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [formData, setFormData] = useState({
    text: "",
    translation: "",
  });

  async function loadData() {
    setLoading(true);
    const data = await fetchWhakatauki();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  function openAdd() {
    setEditing(null);
    setFormData({ text: "", translation: "" });
    setIsModalOpen(true);
  }

  function openEdit(item) {
    setEditing(item);
    setFormData({
      text: item.text,
      translation: item.translation || "",
    });
    setIsModalOpen(true);
  }

  async function handleSave() {
    if (!formData.text.trim()) return alert("Text required");

    if (editing) {
      await updateWhakatauki(editing.id, formData);
    } else {
      await createWhakatauki(formData);
    }

    setIsModalOpen(false);
    loadData();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this whakataukī?")) return;
    await deleteWhakatauki(id);
    loadData();
  }

  const columns = [
    { key: "text", label: "Text" },
    { key: "translation", label: "Translation" },
  ];

  return (
    <div className="page">
      <h1>Whakataukī</h1>
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
        title={editing ? "Edit Whakataukī" : "Add Whakataukī"}
      >
        <div className="form-group">
          <label>Text*</label>
          <input
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            placeholder="E.g., 'He tina ki runga...'"
          />
        </div>

        <div className="form-group">
          <label>Translation</label>
          <input
            value={formData.translation}
            onChange={(e) =>
              setFormData({ ...formData, translation: e.target.value })
            }
            placeholder="Translation..."
          />
        </div>
      </AdminModal>
    </div>
  );
}
