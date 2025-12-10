/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react"
import { snapshotsApi } from "../api/snapshots"
import CrudTable from "../components/CrudTable"
import CrudModal from "../components/CrudModal"
import DeleteConfirmModal from "../components/DeleteConfirmModal"

export default function SnapshotsPage() {
  const [items, setItems] = useState([])
  const [selected, setSelected] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [isDeleteOpen, setDeleteOpen] = useState(false)

  async function loadItems() {
    const data = await snapshotsApi.list()
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
      await snapshotsApi.update(selected.id, values)
    } else {
      await snapshotsApi.create(values)
    }

    setModalOpen(false)
    await loadItems()
  }

  async function confirmDelete() {
    await snapshotsApi.remove(selected.id)
    setDeleteOpen(false)
    await loadItems()
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Progress Snapshots</h1>

      <button className="button-primary" onClick={handleCreate}>
        + Add Snapshot
      </button>

      <CrudTable
        items={items}
        fields={["id", "title"]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={selected ? "Edit Snapshot" : "New Snapshot"}
        initialValues={
          selected || {
            title: "",
            description: "",
          }
        }
        fields={[
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
        ]}
        onSubmit={submitForm}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
        itemName={selected?.title}
      />
    </div>
  )
}
