import React, { useEffect, useState } from "react";
import CrudTable from "../components/CrudTable";
import CrudModal from "../components/CrudModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { toast } from "../components/ToastProvider";
import * as conditionsApi from "../api/conditions";

export default function ConditionsPage() {
  const [conditions, setConditions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  async function load() {
    try {
      setLoading(true);
      const data = await conditionsApi.fetchConditions();
      setConditions(data);
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
        await conditionsApi.updateCondition(editing.id, formData);
        toast.success("Condition updated");
      } else {
        await conditionsApi.createCondition(formData);
        toast.success("Condition created");
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
      await conditionsApi.deleteCondition(deleteId);
      toast.success("Condition deleted");
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
        onClick={() => { setEditing(null); setIsModalOpen(true); }}
      >
        + Add Condition
      </button>

      <CrudTable
        rows={conditions}
        loading={loading}
        error={error}
        columns={[
          { key: "title", label: "Title" },
          { key: "summary", label: "Summary" },
          { key: "image", label: "Image" },
        ]}
        onEdit={(row) => { setEditing(row); setIsModalOpen(true); }}
        onDelete={(row) => setDeleteId(row.id)}
      />

      <CrudModal
        open={isModalOpen}
        initial={editing}
        fields={[
          { name: "title", label: "Title" },
          { name: "summary", label: "Summary", type: "textarea" },
          { name: "image", label: "Image Path" },
          {
            name: "triggers",
            label: "Triggers (comma separated)",
            type: "textarea",
            parse: (v) => v.split(",").map((s) => s.trim()),
            format: (arr) => arr?.join(", ") ?? ""
          },
          {
            name: "treatments",
            label: "Treatments (comma separated)",
            type: "textarea",
            parse: (v) => v.split(",").map((s) => s.trim()),
            format: (arr) => arr?.join(", ") ?? ""
          }
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
