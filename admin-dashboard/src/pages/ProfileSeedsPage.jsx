import React, { useEffect, useState } from "react";
import CrudTable from "../components/CrudTable";
import CrudModal from "../components/CrudModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { toast } from "../components/ToastProvider";
import * as profileSeedsApi from "../api/profileSeeds";

export default function ProfileSeedsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  async function load() {
    try {
      setLoading(true);
      const data = await profileSeedsApi.fetchProfileSeeds();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleSave(data) {
    try {
      if (editing) {
        await profileSeedsApi.updateProfileSeed(editing.id, data);
        toast.success("Profile seed updated");
      } else {
        await profileSeedsApi.createProfileSeed(data);
        toast.success("Profile seed created");
      }
      setIsModalOpen(false);
      setEditing(null);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleDelete() {
    try {
      await profileSeedsApi.deleteProfileSeed(deleteId);
      toast.success("Profile seed deleted");
      setDeleteId(null);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="page-container">
      <h1>Profile Seeds</h1>

      <button
        className="btn-primary"
        onClick={() => { setEditing(null); setIsModalOpen(true); }}
      >
        + Add Seed
      </button>

      <CrudTable
        rows={items}
        loading={loading}
        error={error}
        columns={[
          { key: "title", label: "Title" },
          { key: "description", label: "Description" },
          { key: "orderIndex", label: "Order" }
        ]}
        onEdit={(row) => { setEditing(row); setIsModalOpen(true); }}
        onDelete={(row) => setDeleteId(row.id)}
      />

      <CrudModal
        open={isModalOpen}
        initial={editing}
        fields={[
          { name: "title", label: "Title" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "orderIndex", label: "Order", type: "number" },
        ]}
        onSave={handleSave}
        onClose={() => { setEditing(null); setIsModalOpen(false); }}
      />

      <DeleteConfirmModal
        open={deleteId !== null}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
