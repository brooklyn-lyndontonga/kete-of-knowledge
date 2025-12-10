import React, { useEffect, useState } from "react";
import CrudTable from "../components/CrudTable";
import CrudModal from "../components/CrudModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { toast } from "../components/ToastProvider";
import * as conditionsApi from "../api/conditions";

export default function ConditionsPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  async function load() {
    try {
      const data = await conditionsApi.fetchConditions();
      setRows(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function normalise(formData) {
    return {
      ...formData,
      triggers: formData.triggers?.split(",").map(t=>t.trim()),
      treatments: formData.treatments?.split(",").map(t=>t.trim()),
      images: formData.images?.split(",").map(t=>t.trim()),
    };
  }

  async function handleSave(formData) {
    try {
      const cleaned = normalise(formData);

      if (editing) {
        await conditionsApi.updateCondition(editing.id, cleaned);
        toast.success("Condition updated");
      } else {
        await conditionsApi.createCondition(cleaned);
        toast.success("Condition created");
      }

      setModalOpen(false);
      setEditing(null);
      load();
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  }

  async function handleDelete() {
    try {
      await conditionsApi.deleteCondition(deleteId);
      toast.success("Deleted");
      setDeleteId(null);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="page-container">
      <h1>Conditions</h1>

      <button
        className="btn-primary"
        onClick={() => { setEditing(null); setModalOpen(true); }}
      >
        + Add Condition
      </button>

      <CrudTable
        rows={rows}
        loading={loading}
        error={error}
        columns={[
          { key: "name", label: "Name" },
          { key: "summary", label: "Summary" },
        ]}
        onEdit={(row) => { 
          setEditing({
            ...row,
            triggers: row.triggers?.join(", "),
            treatments: row.treatments?.join(", "),
            images: row.images?.join(", "),
          });
          setModalOpen(true);
        }}
        onDelete={(row) => setDeleteId(row.id)}
      />

      <CrudModal
        open={modalOpen}
        initial={editing}
        onClose={() => { setEditing(null); setModalOpen(false); }}
        onSave={handleSave}
        fields={[
          { name: "name", label: "Name" },
          { name: "summary", label: "Summary", type: "textarea" },
          { name: "triggers", label: "Triggers (comma-separated)" },
          { name: "treatments", label: "Treatments (comma-separated)" },
          { name: "images", label: "Images (comma-separated)" },
        ]}
      />

      <DeleteConfirmModal
        open={deleteId !== null}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
