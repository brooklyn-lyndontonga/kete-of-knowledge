import React, { useEffect, useState } from "react";
import CrudTable from "../components/CrudTable";
import CrudModal from "../components/CrudModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { toast } from "../components/ToastProvider";
import * as myMedicinesApi from "../api/myMedicines";

export default function MyMedicinesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  async function load() {
    try {
      const data = await myMedicinesApi.fetchMyMedicines();
      setItems(data);
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
        await myMedicinesApi.updateMyMedicine(editing.id, formData);
        toast.success("Updated");
      } else {
        await myMedicinesApi.createMyMedicine(formData);
        toast.success("Added");
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
      await myMedicinesApi.deleteMyMedicine(deleteId);
      toast.success("Deleted");
      setDeleteId(null);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="page-container">
      <h1>My Medicines</h1>

      <button className="btn-primary" onClick={() => { setEditing(null); setModalOpen(true); }}>
        + Add Medicine
      </button>

      <CrudTable
        rows={items}
        loading={loading}
        error={error}
        columns={[
          { key: "name", label: "Name" },
          { key: "dosage", label: "Dosage" },
          { key: "frequency", label: "Frequency" }
        ]}
        onEdit={(row) => { setEditing(row); setModalOpen(true); }}
        onDelete={(row) => setDeleteId(row.id)}
      />

      <CrudModal
        open={modalOpen}
        initial={editing}
        fields={[
          { name: "name", label: "Name" },
          { name: "dosage", label: "Dosage" },
          { name: "frequency", label: "Frequency" },
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
