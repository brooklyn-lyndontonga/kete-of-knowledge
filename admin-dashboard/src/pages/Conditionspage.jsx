/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react"
import { conditionsApi } from "../api/conditions"
import CrudTable from "../components/CrudTable"
import CrudModal from "../components/CrudModal"
import DeleteConfirmModal from "../components/DeleteConfirmModal"

export default function ConditionsPage() {
  const [items, setItems] = useState([])
  const [selected, setSelected] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [isDeleteOpen, setDeleteOpen] = useState(false)

  async function loadItems() {
    const data = await conditionsApi.list()
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
      triggers: values.triggers ? values.triggers.split(",").map(s => s.trim()) : [],
      treatments: values.treatments ? values.treatments.split(",").map(s => s.trim()) : [],
      images: values.images ? values.images.split(",").map(s => s.trim()) : [],
    }

    if (selected) {
      await conditionsApi.update(selected.id, payload)
    } else {
      await conditionsApi.create(payload)
    }

    setModalOpen(false)
    await loadItems()
  }

  async function confirmDelete() {
    await conditionsApi.remove(selected.id)
    setDeleteOpen(false)
    await loadItems()
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Conditions</h1>

      <button className="button-primary" onClick={handleCreate}>
        + Add Condition
      </button>

      <CrudTable
        items={items}
        fields={["id", "name"]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={selected ? "Edit Condition" : "New Condition"}
        initialValues={
          selected ||
          {
            name: "",
            triggers: "",
            treatments: "",
            images: "",
          }
        }
        fields={[
          { name: "name", label: "Name", type: "text" },
          { name: "triggers", label: "Triggers (comma separated)", type: "textarea" },
          { name: "treatments", label: "Treatments (comma separated)", type: "textarea" },
          { name: "images", label: "Image URLs (comma separated)", type: "textarea" },
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
