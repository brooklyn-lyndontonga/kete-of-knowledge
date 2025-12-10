import React, { useEffect, useState } from "react";
import CrudTable from "../components/CrudTable";
import CrudModal from "../components/CrudModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { toast } from "../components/ToastProvider";
import * as resourcesApi from "../api/resources";
import * as categoriesApi from "../api/resourceCategories";

export default function ResourcesPage() {
  const [rows, setRows] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  async function load() {
    try {
      const [res, cats] = await Promise.all([
        resourcesApi.fetchResources(),
        categoriesApi.fetchResourceCategories()
      ]);

      setRows(res);
      setCategories(cats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleSave(formData) {
    try {
      if (editing) {
        await resourcesApi.updateResource(editing.id, formData);
        toast.success("Resource updated");
      } else {
        await resourcesApi.createResource(formData);
        toast.success("Resource created");
      }

      setEditing(null);
      setModalOpen(false);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleDelete() {
    try {
      await resourcesApi.deleteResource(deleteId);
      toast.success("Deleted");
      setDeleteId(null);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="page-container">
      <h1>Library Resources</h1>

      <button className="btn-primary" onClick={() => { setEditing(null); setModalOpen(true); }}>
        + Add Resource
      </button>

      <CrudTable
        rows={rows}
        loading={loading}
        error={error}
        columns={[
          { key: "title", label: "Title" },
          { key: "summary", label: "Summary" },
          { key: "categoryId", label: "Category ID" },
        ]}
        onEdit={(row) => { setEditing(row); setModalOpen(true); }}
        onDelete={(row) => setDeleteId(row.id)}
      />

      <CrudModal
        open={modalOpen}
        initial={editing}
        fields={[
          { name: "title", label: "Title" },
          { name: "summary", label: "Summary", type: "textarea" },
          { name: "image", label: "Image Path (/images/...)" },
          {
            name: "categoryId",
            label: "Category",
            type: "select",
            options: categories.map(c => ({ label: c.name, value: c.id }))
          }
        ]}
        onSave={handleSave}
        onClose={() => { setEditing(null); setModalOpen(false); }}
      />

      <DeleteConfirmModal
        open={deleteId !== null}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
