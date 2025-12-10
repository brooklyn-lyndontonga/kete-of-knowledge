/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react"
import { symptomsApi } from "../api/symptoms"
import CrudTable from "../components/CrudTable"
import CrudModal from "../components/CrudModal"
import DeleteConfirmModal from "../components/DeleteConfirmModal"

export default function SymptomsPage() {
  const [items, setItems] = useState([])
  const [selected, setSelected] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [isDeleteOpen, setDeleteOpen] = useState(false)

  async function loadItems() {
    const data = await symptomsApi.list()
    setItems(data)
  }

  useEffect(() => {
    loadItems()
  }, [])

  function handleCreate() {
    setSelected(null)
    setModalOpen(true)
  }

  function handleEdit(item) {
    setSelected(item)
    setModalOpen(true)
  }

  function handleDelete(item) {
    setSelected(item)
    setDeleteOpen(true)
  }

  async function submitForm(values) {
    const payload = {
      ...values,
      severity_scale: Number(values.severity_scale) || 1,
    }

    if (selected) {
      await symptomsApi.update(selected.id, payload)
    } else {
      await symptomsApi.create(payload)
    }

    setModalOpen(false)
    await loadItems()
  }

  async function confirmDelete() {
    await symptomsApi.remove(selected.id)
    setDeleteOpen(false)
    await loadItems()
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Symptoms</h1>

      <button className="button-primary" onClick={handleCreate}>
        + Add Symptom
      </button>

      <CrudTable
        items={items}
        fields={["id", "name", "severity_scale"]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={selected ? "Edit Symptom" : "New Symptom"}
        initialValues={
          selected || {
            name: "",
            description: "",
            severity_scale: 1,
          }
        }
        fields={[
          { name: "name", label: "Name", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "severity_scale", label: "Severity Scale (1–10)", type: "number" },
        ]}
        onSubmit={submitForm}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
        itemName={selected?.name}
      />
    </div>
  )
}
