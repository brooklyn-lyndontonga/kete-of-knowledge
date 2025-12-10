/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react"
import { myMedicinesApi } from "../api/myMedicines"
import CrudTable from "../components/CrudTable"
import CrudModal from "../components/CrudModal"
import DeleteConfirmModal from "../components/DeleteConfirmModal"

export default function MyMedicinesPage() {
  const [items, setItems] = useState([])
  const [selected, setSelected] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [isDeleteOpen, setDeleteOpen] = useState(false)

  async function loadItems() {
    const data = await myMedicinesApi.list()
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
    if (selected) {
      await myMedicinesApi.update(selected.id, values)
    } else {
      await myMedicinesApi.create(values)
    }

    setModalOpen(false)
    await loadItems()
  }

  async function confirmDelete() {
    await myMedicinesApi.remove(selected.id)
    setDeleteOpen(false)
    await loadItems()
  }

  return (
    <div className="page-container">
      <h1 className="page-title">My Medicines</h1>

      <button className="button-primary" onClick={handleCreate}>
        + Add Medicine
      </button>

      <CrudTable
        items={items}
        fields={["id", "name", "dosage"]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={selected ? "Edit Medicine" : "New Medicine"}
        initialValues={
          selected || {
            name: "",
            dosage: "",
            schedule: "",
            description: "",
          }
        }
        fields={[
          { name: "name", label: "Name", type: "text" },
          { name: "dosage", label: "Dosage", type: "text" },
          { name: "schedule", label: "Schedule", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
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
