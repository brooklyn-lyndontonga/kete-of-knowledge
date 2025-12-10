import React, { useEffect, useState } from "react";
import CrudTable from "../components/CrudTable";
import CrudModal from "../components/CrudModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { toast } from "../components/ToastProvider";
import * as symptomsApi from "../api/symptoms";

export default function SymptomsPage() {
  const [symptoms, setSymptoms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  async function load() {
    try {
      const data = await symptomsApi.fetchSymptoms();
      setSymptoms(data);
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
        await symptomsApi.updateSymptom(editing.id, formData);
        toast.success("Updated");
      } else {
        await symptomsApi.createSymptom(formData);
        toast.success("Created");
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
      await symptomsApi.deleteSymptom(deleteId);
      toast.success("Deleted");
      setDeleteId(null);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="page-container">
      <h1>Symptoms Tracker</h1>

      <button className="btn-primary" onClick={() => { setEditing(null); setModalOpen(true); }}>
        + Add Symptom
      </button>

      <CrudTable
        rows={symptoms}
        loading={loading}
        error={error}
        columns={[
          { key: "date", label: "Date" },
          { key: "symptom", label: "Symptom" },
          { key: "severity", label: "Severity" }
        ]}
        onEdit={(row) => { setEditing(row); setModalOpen(true); }}
        onDelete={(row) => setDeleteId(row.id)}
      />

      <CrudModal
        open={modalOpen}
        initial={editing}
        fields={[
          { name: "date", label: "Date" },
          { name: "symptom", label: "Symptom" },
          { name: "severity", label: "Severity (1–10)" },
          { name: "notes", label: "Notes", type: "textarea" }
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
