import React, { useEffect, useState } from "react";
import CrudTable from "../components/CrudTable";
import CrudModal from "../components/CrudModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { toast } from "../components/ToastProvider";
import * as snapshotsApi from "../api/snapshots";

export default function SnapshotsPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  async function load() {
    try {
      const data = await snapshotsApi.fetchSnapshots();
      setRows(data);
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
        await snapshotsApi.updateSnapshot(editing.id, formData);
        toast.success("Snapshot updated");
      } else {
        await snapshotsApi.createSnapshot(formData);
        toast.success("Snapshot created");
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
      await snapshotsApi.deleteSnapshot(deleteId);
      toast.success("Deleted");
      setDeleteId(null);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="page-container">
      <h1>Progress Snapshots</h1>

      <button
        className="btn-primary"
        onClick={() => { setEditing(null); setModalOpen(true); }}
      >
        + Add Snapshot
      </button>

      <CrudTable
        rows={rows}
        loading={loading}
        error={error}
        columns={[
          { key: "label", label: "Label" },
          { key: "percentage", label: "Percentage" },
          { key: "color", label: "Color" }
        ]}
        onEdit={(row) => { setEditing(row); setModalOpen(true); }}
        onDelete={(row) => setDeleteId(row.id)}
      />

      <CrudModal
        open={modalOpen}
        initial={editing}
        fields={[
          { name: "label", label: "Label" },
          { name: "percentage", label: "Percentage" },
          { name: "color", label: "Color" }
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
