/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react"
import { resourceCategoriesApi } from "../api/resourceCategories"
import CrudTable from "../components/CrudTable"
import CrudModal from "../components/CrudModal"
import DeleteConfirmModal from "../components/DeleteConfirmModal"

export default function ResourceCategoriesPage() {
  const [items, setItems] = useState([])
  const [selected, setSelected] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [isDeleteOpen, setDeleteOpen] = useState(false)

  async function loadItems() {
    const data = await resourceCategoriesApi.list()
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
      await resourceCategoriesApi.update(selected.id, values)
    } else {
      await resourceCategoriesApi.create(values)
    }

    setModalOpen(false)
    await loadItems()
  }

  async function confirmDelete() {
    await resourceCategoriesApi.remove(selected.id)
    setDeleteOpen(false)
    await loadItems()
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Resource Categories</h1>

      <button className="button-primary" onClick={handleCreate}>
        + Add Category
      </button>

      <CrudTable
        items={items}
        fields={["id", "name", "description"]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={selected ? "Edit Category" : "New Category"}
        initialValues={
          selected || { name: "", description: "" }
        }
        fields={[
          { name: "name", label: "Name", type: "text" },
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
