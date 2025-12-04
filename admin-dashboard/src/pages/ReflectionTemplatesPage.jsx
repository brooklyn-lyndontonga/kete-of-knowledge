/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import AdminTable from "../components/AdminTable";
import AdminModal from "../components/AdminModal";
import {
  fetchReflectionTemplates,
  createReflectionTemplate,
  updateReflectionTemplate,
  deleteReflectionTemplate,
} from "../api/reflectionTemplates";

export default function ReflectionTemplatesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    story: "",
    caption: "",
  });

  async function loadData() {
    setLoading(true);
    const data = await fetchReflectionTemplates();
    setItems(data);
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

  function openAdd() {
    setEditing(null);
    setFormData({ title: "", story: "", caption: "" });
    setIsModalOpen(true);
  }

  function openEdit(item) {
    setEditing(item);
    setFormData({
      title: item.title,
      story: item.story || "",
      caption: item.caption || "",
    });
    setIsModalOpen(true);
  }

  async function handleSave() {
    if (!formData.title) return alert("Title required");

    if (editing) {
      await updateReflectionTemplate(editing.id, formData);
    } else {
      await createReflectionTemplate(formData);
    }

    setIsModalOpen(false);
    loadData();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this reflection template?")) return;
    await deleteReflectionTemplate(id);
    loadData();
  }

  const columns = [
    { key: "title", label: "Title" },
    { key: "caption", label: "Caption" },
  ];

  return (
    <div className="page">
      <h1>Reflection Templates</h1>
      <button className="primary-btn" onClick={openAdd}>+ Add Template</button>

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
        title={editing ? "Edit Template" : "Add Template"}
        onSave={handleSave}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="form-group">
          <label>Title*</label>
          <input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Story</label>
          <textarea
            rows="4"
            value={formData.story}
            onChange={(e) => setFormData({ ...formData, story: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Caption</label>
          <input
            value={formData.caption}
            onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
          />
        </div>
      </AdminModal>
    </div>
  );
}
