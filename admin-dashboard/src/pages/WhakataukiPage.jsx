import React, { useEffect, useState } from "react";
import CrudTable from "../components/CrudTable";
import CrudModal from "../components/CrudModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import { toast } from "../components/ToastProvider";
import * as whakataukiApi from "../api/whakatauki";

export default function WhakataukiPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  async function load() {
    try {
      const data = await whakataukiApi.fetchWhakatauki();
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
        await whakataukiApi.updateWhakatauki(editing.id, formData);
        toast.success("Whakataukī updated");
      } else {
        await whakataukiApi.createWhakatauki(formData);
        toast.success("Whakataukī created");
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
      await whakataukiApi.deleteWhakatauki(deleteId);
      toast.success("Deleted");
      setDeleteId(null);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="page-container">
      <h1>Whakataukī</h1>

      <button
        className="btn-primary"
        onClick={() => { setEditing(null); setModalOpen(true); }}
      >
        + Add Whakataukī
      </button>

      <CrudTable
        rows={rows}
        loading={loading}
        error={error}
        columns={[
          { key: "text", label: "Text" },
          { key: "translation", label: "Translation" },
        ]}
        onEdit={(row) => { setEditing(row); setModalOpen(true); }}
        onDelete={(row) => setDeleteId(row.id)}
      />

      <CrudModal
        open={modalOpen}
        initial={editing}
        fields={[
          { name: "text", label: "Text", type: "textarea" },
          { name: "translation", label: "Translation", type: "textarea" },
          { name: "attribution", label: "Attribution" },
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
