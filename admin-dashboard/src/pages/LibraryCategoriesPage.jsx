/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react"
import { libraryCategoriesApi } from "../api/resourceCategories"
import CrudTable from "../components/CrudTable"
import CrudModal from "../components/CrudModal"
import DeleteConfirmModal from "../components/DeleteConfirmModal"

export default function LibraryCategoriesPage() {
  const [items, setItems] = useState([])
  const [selected, setSelected] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [isDeleteOpen, setDeleteOpen] = useState(false)

  async function loadItems() {
    const data = await libraryCategoriesApi.list()
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
      order_index: Number(values.order_index) || 0,
    }

    if (selected) {
      await libraryCategoriesApi.update(selected.id, payload)
    } else {
      await libraryCategoriesApi.create(payload)
    }

    setModalOpen(false)
    await loadItems()
  }

  async function confirmDelete() {
    await libraryCategoriesApi.remove(selected.id)
    setDeleteOpen(false)
    await loadItems()
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Library Categories</h1>

      <button className="button-primary" onClick={handleCreate}>
        + Add Category
      </button>

      <CrudTable
        items={items}
        fields={["id", "name", "order_index"]}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CrudModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={selected ? "Edit Category" : "New Category"}
        initialValues={
          selected || {
            name: "",
            description: "",
            icon: "",
            order_index: 0,
          }
        }
        fields={[
          { name: "name", label: "Name", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "icon", label: "Icon (optional)", type: "text" },
          { name: "order_index", label: "Display Order", type: "number" },
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
