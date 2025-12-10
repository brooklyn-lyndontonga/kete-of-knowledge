import React, { useEffect, useState } from "react";
import CrudTable from "../components/CrudTable";
import CrudModal from "../components/CrudModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { toast } from "../components/ToastProvider";
import * as resourceCategoriesApi from "../api/resourceCategories";

export default function LibraryCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  async function load() {
    try {
      const data = await resourceCategoriesApi.fetchResourceCategories();
      setCategories(data);
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
        await resourceCategoriesApi.updateResourceCategory(editing.id, formData);
        toast.success("Category updated");
      } else {
        await resourceCategoriesApi.createResourceCategory(formData);
        toast.success("Category created");
      }
      setModalOpen(false);
      setEditing(null);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleDelete() {
    try {
      await resourceCategoriesApi.deleteResourceCategory(deleteId);
      toast.success("Category deleted");
      setDeleteId(null);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="page-container">
      <h1>Library Categories</h1>

      <button
        className="btn-primary"
        onClick={() => { setEditing(null); setModalOpen(true); }}
      >
        + Add Category
      </button>

      <CrudTable
        rows={categories}
        loading={loading}
        error={error}
        columns={[
          { key: "name", label: "Name" },
          { key: "slug", label: "Slug" },
          { key: "image", label: "Image" }
        ]}
        onEdit={(row) => { setEditing(row); setModalOpen(true); }}
        onDelete={(row) => setDeleteId(row.id)}
      />

      <CrudModal
        open={modalOpen}
        initial={editing}
        fields={[
          { name: "name", label: "Name" },
          { name: "slug", label: "Slug" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "image", label: "Image Path" }
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
